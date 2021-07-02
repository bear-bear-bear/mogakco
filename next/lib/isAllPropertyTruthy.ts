type AnyObject = Record<string, unknown>;

const isAllPropertyTruthy = <T extends AnyObject>(obj: T) => {
  return Object.values(obj).reduce(
    (prev, curr) => prev && Boolean(curr),
    true,
  ) as boolean;
};

export default isAllPropertyTruthy;
