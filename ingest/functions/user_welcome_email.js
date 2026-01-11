import my_ingest from "../client.js";
import user from "../../models/user.js";
import { NonRetriableError } from "inngest";
import send_email from "../../background_workars/send_email.js";

const user_welcome_email= my_ingest.createFunction(
    
    {id:"on_user_signup",retries:2},
    {event:"user/signup"},

    async({event,step})=>{
        try {
            
            const email=await step.run("check_data_validity",()=>{ 
                const {email}=event.data;
                if(!email ){
                     throw new NonRetriableError("data is not valid");
                }
                return email
            })

            //user is actually there or not
            const userData=await step.run("check_is_emial_exist",async()=>{
                const userInfo=await user.findOne({email});
                if(!userInfo){
                    throw new NonRetriableError("user not exist in database");
                }
                return userInfo;
            })

            //send email via previous function
            await step.run("send_email",async()=>{
            //    from,to,subject,text,html
           const from="satya mallick AI application"
           const to=userData.email
           const subject="welcome message"
           const text="welcome to our ai applicaton"
           const html=`<h2>hello ${userData.name}, thanks for signin</h2>`
                await send_email(from,to,subject,text,html);
            })
            return {success:true}
        } catch (error) {
            console.error("error in user welcome email: ",error)
              return {success:false}
        }
    }
)

export default user_welcome_email