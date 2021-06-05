export const evalResponseBodyMessage = (
  response: { statusCode: number; message: string },
  expectStatusCode: number,
  expectMessage: string,
) => {
  console.log(response);
  expect(response.statusCode).toBe(expectStatusCode);
  expect(response.message).toBe(expectMessage);
};

export default {};
