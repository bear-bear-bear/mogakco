/**
 * @example
    import makeActions from '~/lib/makeActions';

    const moduleName = 'common';
    const actionNames = ['LOGIN', 'LOGOUT'];
    const actions = makeActions(moduleName, actionNames);

    export default actions;
 *
 * @example <caption>Example usage in reducer</caption>
    import userActions from '~/redux/actions/common/user';

    const { LOGIN, LOGOUT } = userActions;
    
    switch (action.type) {
      case LOGIN.REQUEST:
        ...
      case LOGIN.SUCCESS:
        ...
      case LOGIN.FAILURE:
        ...
    }
 */

export default function makeActions(moduleName, actionNames) {
  return actionNames.reduce((acc, currAction) => {
    acc[currAction] = {
      REQUEST: `${moduleName}/${currAction}_REQUEST`,
      SUCCESS: `${moduleName}/${currAction}_SUCCESS`,
      FAILURE: `${moduleName}/${currAction}_FAILURE`,
    };
    return acc;
  }, {});
}
