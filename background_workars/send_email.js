import nodemailer from "nodemailer"


const send_email=async(from,to,subject,text,html)=>{
try {
      const transporter = nodemailer.createTransport({
      host:process.env.mailtrap_smtp_host,
      port: Number(process.env.mailtrap_smtp_port),
      secure: false,
      auth: {
            user: process.env.mailtrap_smtp_user,
            pass: process.env.mailtrap_smtp_pass,
        },
  });

      const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });

    return info;
} catch (error) {
  
    console.log("error in email sending ",error)
    throw error
}

}

export default send_email 