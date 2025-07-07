// import emailjs from "@emailjs/browser";

// const mail = ({ name, email, message }) => {
//   console.log("service id : ", NEXT_PUBLIC_SERVICE_ID);
//   emailjs.send(
//     process.env.NEXT_PUBLIC_SERVICE_ID,
//     process.env.NEXT_PUBLIC_TEMPLATE_ID,
//     { name, email, message },
//     {
//       publicKey: process.env.NEXT_PUBLIC_USER_ID,
//       limitRate: {
//         throttle: 10000, // 10s
//       },
//     }
//   );
// };

// export default mail;

const mail = async ({ name, email, message }) => {
  try {
    // Get the API base URL from environment variables
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://sendmail-lh2t.onrender.com";

    const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();
    console.log(response);
    if (!response.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    console.log("✅ Email sent successfully:", data.message);
    return {
      success: true,
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);

    // Return error details for handling in your component
    return {
      success: false,
      error: error.message,
    };
  }
};

export default mail;
