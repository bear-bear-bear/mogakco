import makeActionTypes from '~/lib/makeActionTypes';

const moduleName = 'common';
const actionNames = ['LOGIN', 'LOGOUT'];
const actionTypes = makeActionTypes(moduleName, actionNames);

export default actionTypes;
