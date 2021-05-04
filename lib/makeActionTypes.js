/**
 * @example
 * https://github.com/bear-bear-bear/mogakco/pull/63
 */

export default function makeActionTypes(moduleName, actionNames) {
  return actionNames.reduce((acc, currAction) => {
    acc[currAction] = {
      REQUEST: `${moduleName}/${currAction}_REQUEST`,
      SUCCESS: `${moduleName}/${currAction}_SUCCESS`,
      FAILURE: `${moduleName}/${currAction}_FAILURE`,
    };
    return acc;
  }, {});
}
