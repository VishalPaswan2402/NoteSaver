import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host:
        // process.env.emailHost ||
        "smtp.ethereal.email",
    secure: false,
    auth: {
        user:
            // process.env.emailUser ||
            'alice.howell@ethereal.email',
        pass:
            // process.env.emailPass ||
            'X7ZhmJPsCXhuf5ZmG4',
    },
});

export async function mailSender(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"NoteDrive" <alice.howell@ethereal.email>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Send Successfully...");
        return { success: true, info };
    }
    catch (err) {
        console.log(err);
        return { success: false, error: err };
    }
}
