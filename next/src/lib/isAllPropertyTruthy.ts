type AnyObject = Record<string, any>;

const isAllPropertyTruthy = <T extends AnyObject>(obj: T) => {
  if (Object.values(obj).length === 0) return false;
  return Object.values(obj).reduce((prev, curr) => prev && Boolean(curr));
};

export default isAllPropertyTruthy;
