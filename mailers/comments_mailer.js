const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) =>{

    // console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment} ,'/comments/new_comment.ejs')

    console.log(htmlString);
    nodeMailer.transporter.sendMail({
        from : 'hoyt9936@gmail.com',
        to: comment.user.email,
        subject: "New comments published!",
        html: htmlString
    }).then(info =>{
        console.log('Message Sent', info);
        return;
    }).catch(err=>{
        console.log('Error in sending mail',  err);
        return;
    });

}

