const nodemailer = require('nodemailer');


const sendMail = (email,subject,user,pass,host,port,text,html) =>{

   
    const transporter = nodemailer.createTransport({
        port : port,
        host : host,
        auth : {
          user : user,
          pass : pass, 
        },
        secure : true,
     });
    

    


     const mailData = {
         //'"Fred Foo 👻" <foo@example.com>'
       from : "Rsmeet",user,
       to : email,
       subject : subject,
       text : text,
       html : html,
     };
  
     transporter.sendMail(mailData);

   
     

}

module.exports.sendMailFunc = sendMail;