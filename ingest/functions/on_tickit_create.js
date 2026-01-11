import my_ingest from "../client.js";
import { NonRetriableError } from "inngest";
import Tickit from "../../models/tickit.js";
import User from "../../models/user.js";
import send_email from "../../background_workars/send_email.js";
import { analyzeTicket } from "../../background_workars/agent.js";

const on_tickit_crete = my_ingest.createFunction(
  { id: "on_tickit_create", retries: 3 },
  { event: "tickit/created" },

  async ({ event, step }) => {
    try {
      const { tickitId } = event.data;

      const tickit = await step.run("fetch_tickit", async () => {
        const tickitData = await Tickit({ _id: tickitId });
        if (!tickitData) throw new NonRetriableError("tickit data not found");
        return tickitData;
      });

      
      const updateTickit = await step.run("update_tickit_status", async () => {
       const updated=await Tickit.findOneAndUpdate({_id:tickitId},{status:"TODO"});
       return updated
      });

      const aiResponse =await step.run("get_ai_response",async()=>{
       
        return await analyzeTicket(updateTickit);
      });
      console.log(aiResponse);
      
      const reletedSkills=await step.run("ai-response-processing",async()=>{
        if(aiResponse){
            let priority="medium";
            if(aiResponse.priority=="low" || aiResponse.priority=="medium" || aiResponse.priority=="high") {
                priority=aiResponse.priority
            }

            await Tickit.findByIdAndUpdate({_id:tickitId},{
                status:"IN Progress",
                priority:priority,
                skillesNeeded:aiResponse.relatedSkills,
                helpFullNotes:aiResponse.helpfulNotes 
            })
           return aiResponse?.relatedSkills ?? [];
        }
      })

      const moderator=await step.run("find-moderator",async()=>{
        let user=await User.findOne({
        role:"moderator",
        skills:{
            $elemMatch:{
                $regex:reletedSkills.join("|"),
                $options:"i"
            }
        } 
      })

      if(!user){
        user=await User.findOne({
            role:"admin"
        })
      }

      await Tickit.findOneAndUpdate({_id:tickitId},{
        asignedTo:user._id,
        status:"Completed"
      })
      return user
      })


      await step.run("send-notification",async()=>{

        const from="satya mallick AI application"
        const to=moderator.email
        const subject="New Ticket Asigned"
        const text="You Asign for a new work"
        const html=`<div>
        <h2>hello ${moderator.name}</h2>
        <p>JOB : ${updateTickit.title}</p>
        <p>deps :${updateTickit.depscription}</p>
        </div>
        `

        await send_email(from,to,subject,text,html);
        
        return true
      })
     return {success:true}
    } catch (error) {
        console.error("error in AI tickit asignd: ",error)
        return {success:false}
    }
  }
);

export default on_tickit_crete