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

export const evalToStrictEqualBodyMessage = (
  response: ResponseBodyProps & { error: string },
  strictEqual: any,
) => {
  expect(response).toStrictEqual(strictEqual);
};
