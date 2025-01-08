//*******     Email Controller ***********/

const transporter = require('../config/emailConfig')
const emailTemplate = require('../public/views/emailTemplete')

module.exports.sendMail = async (email, userName, OTP) => {
    try{
    const info =  await transporter.sendMail({
    from: '"User Management System" <kaifbrahui9@gmail.com>', // sender address
    to: email, // sender address
    subject: "Verify you Email", // Subject line
    text: "Verify you Email", // plain text body
    html: emailTemplate.emailVerificationTemplete(userName, OTP), // html body
    })
      return "Email sent successfully"

  } catch(error){
     throw new Error("Couldn't send mail: " + error.message)
  }

}