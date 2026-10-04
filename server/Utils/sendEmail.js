// import nodemailer from 'nodemailer';

// import { config } from "dotenv";


// config()

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER   ,
//         pass: process.env.EMAIL_PASS
//     }
// });


// export const sendOtpEmail = async (email, otp) => {
//     await transporter.sendMail({
//         from: ` "My Website" < ${process.env.EMAIL_USER}> `,
//         to: email,
//         subject: "Verify your otp",
//         html: `
//             <div style="font-family:Arial; padding:20px; "> 
//                 <h2> Email verification </h2>
//                 <p>Your OTP for Registration : </p>
//                 <h1>${otp}</h1>
//                 <p>This otp is valid only for 5 min </p>
//             </div>
//         `
//     })
// }


// export const sendWlecomeMail = async (email, name) => {

//     await transporter.sendMail({
//         from: `"My Website" <${process.env.EMAIL_USER}> `,
//         to: email,
//         subject: "Welcome to our website",
//         html: `
//             <div style="font-family:Arial; padding:20px; ">
//                 <h1>Welcome ${name} </h1>
//                 <p> your regestration has been completed successfuly </p>
//                 <p> your Email has been verified</p>
//                 <p> We are happy to have you with Us</p>
//                 <p> You can now login and start using our website</p>
//                 <p> Thank you for joining us</p>
//             </div>
//         `
//     })
// }

import nodemailer from 'nodemailer';
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

export const sendOtpEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
         
            from: `"My Website" <kp7631744@gmail.com>`,
            to: email,
            subject: "Verify your OTP",  
            html: `
                <div style="font-family:Arial; padding:20px;"> 
                    <h2>Email Verification</h2>
                    <p>Your OTP for Registration:</p>
                    <h1>${otp}</h1>
                    <p>This OTP is valid only for 5 minutes.</p>
                </div>
            `
        });
        console.log("OTP Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};

export const sendWlecomeMail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
       
            from: `"My Website" <kp7631744@gmail.com>`,
            to: email,
            subject: "Welcome to our website",
            html: `
                <div style="font-family:Arial; padding:20px;">
                    <h1>Welcome ${name}</h1>
                    <p>Your registration has been completed successfully.</p>
                    <p>Your email has been verified.</p>
                    <p>We are happy to have you with us.</p>
                    <p>You can now login and start using our website.</p>
                    <p>Thank you for joining us.</p>
                </div>
            `
        });
        console.log("Welcome Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};