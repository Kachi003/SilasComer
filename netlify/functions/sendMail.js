import nodemailer from "nodemailer";

export const handler = async (event) => {
  console.log("Function called"); // Check if function is reached

  if (event.httpMethod !== "POST") {
    console.log("Wrong method:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);
  console.log("Request body:", { name, email, subject, message });

  if (!name || !email || !subject || !message) {
    console.log("Missing fields in request body");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  try {
    console.log("Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter created successfully");

    const mailOptions = {
      from: email,
      to: "silascomer2245@gmail.com",
      subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Thank you! I’ll be in touch shortly" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
