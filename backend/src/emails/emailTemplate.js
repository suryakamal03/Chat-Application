export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Messenger</title>
  </head>
  <body style="margin:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f9fafb; color:#333;">
    <table role="presentation" style="width:100%; border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table role="presentation" style="width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="background:linear-gradient(135deg,#4f46e5,#06b6d4); padding:40px;">
                <img src="https://img.freepik.com/free-vector/message-chat-bubble_78370-377.jpg?w=826&t=st=1730454386~exp=1730457986~hmac=92b66a89ac7c6f8b782d4cb7e5597f2b73ab61c73cf9c06351201f4573e64b4e" 
                     alt="Messenger Logo" 
                     style="width:80px; height:80px; border-radius:50%; background:white; padding:10px; margin-bottom:15px;" />
                <h1 style="color:white; font-size:26px; margin:0;">Welcome to Messenger</h1>
              </td>
            </tr>
            
            <tr>
              <td style="padding:40px;">
                <p style="font-size:18px; font-weight:600; color:#111;">Hi ${name},</p>
                <p style="font-size:15px; line-height:1.6; color:#555;">
                  Welcome aboard!  We're thrilled to have you join <strong>ChatApplication</strong> — your all-in-one chat platform for staying connected with the people who matter most.
                </p>

                <div style="background-color:#f3f4f6; padding:20px; border-radius:10px; margin:25px 0;">
                  <p style="margin:0 0 10px 0; font-weight:600;">Here’s what you can do next:</p>
                  <ul style="padding-left:20px; margin:0; color:#444;">
                    <li>Customize your profile</li>
                    <li>Find and chat with friends</li>
                    <li>Share files and media instantly</li>
                  </ul>
                </div>

                <div style="text-align:center; margin:35px 0;">
                  <a href="${clientURL}"
                     style="background:linear-gradient(to right,#4f46e5,#06b6d4); color:white; text-decoration:none; padding:14px 36px; border-radius:50px; font-weight:500; display:inline-block;">
                    Open Messenger
                  </a>
                </div>

                <p style="font-size:14px; color:#555; margin-bottom:0;">
                  If you ever need help, we’re just one message away. Enjoy chatting!
                </p>
                <p style="margin-top:20px; font-size:14px; color:#666;">
                  — The Messenger Team
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background-color:#f9fafb; padding:20px; font-size:12px; color:#888;">
                <p style="margin:0;">© 2025 Messenger. All rights reserved.</p>
                <p style="margin-top:8px;">
                  <a href="#" style="color:#4f46e5; text-decoration:none; margin:0 8px;">Privacy Policy</a> •
                  <a href="#" style="color:#4f46e5; text-decoration:none; margin:0 8px;">Terms</a> •
                  <a href="#" style="color:#4f46e5; text-decoration:none; margin:0 8px;">Support</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
