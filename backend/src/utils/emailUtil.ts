import nodemailer from "nodemailer";


export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const sendVerificationEmail = async (
  email: string,
  code: string
): Promise<void> => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // 이메일 옵션 설정
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "CODIDRIP 비밀번호 찾기 인증번호",
    text: `인증번호는 ${code} 입니다.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">CODIDRIP 비밀번호 찾기</h2>
        <p>안녕하세요. CODIDRIP 비밀번호 찾기를 위한 인증번호를 보내드립니다.</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="color: #333; margin: 0;">인증번호</h3>
          <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 10px 0;">${code}</p>
        </div>
        <p>이 인증번호는 10분간 유효합니다.</p>
        <p style="color: #666; font-size: 12px;">이 이메일은 자동으로 발송되었습니다. 회신하지 마세요.</p>
      </div>
    `,
  };

  // 이메일 발송
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("이메일 발송 중 오류가 발생했습니다:", error);
    throw new Error("이메일 발송에 실패했습니다.");
  }
};
