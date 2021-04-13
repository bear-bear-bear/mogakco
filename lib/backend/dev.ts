export const emailSucessLog = (email: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${email} 으로 이메일이 성공적으로 전송되었습니다.`);
  }
};
