type ValuesMapObject = {
  [key: string]: string | null;
};

const getSessionStorageValues = (...keys: string[]) => {
  const valuesMapObject = keys.reduce((acc, currKey) => {
    acc[currKey] = window.sessionStorage.getItem(currKey);
    return acc;
  }, {} as ValuesMapObject);
  return valuesMapObject;
};

export default getSessionStorageValues;
