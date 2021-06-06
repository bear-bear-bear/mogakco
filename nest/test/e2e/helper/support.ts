type ResponseBodyProps = {
  statusCode: number;
  message: string | string[];
};

export const evalResponseBodyMessage = (
  response: ResponseBodyProps,
  expectStatusCode: number,
  expectMessage: any,
) => {
  expect(response.statusCode).toBe(expectStatusCode);
  expect(response.message).toBe(expectMessage);
};

export const evalToContainBodyMessage = (
  response: ResponseBodyProps,
  expectStatusCode: number,
  expectMessage: any,
) => {
  expect(response.statusCode).toBe(expectStatusCode);
  expect(response.message).toContain(expectMessage);
};
