import makeActions from '~/lib/makeActions';

const moduleName = 'common';
const actionNames = ['LOGIN', 'LOGOUT'];
const actions = makeActions(moduleName, actionNames);

export default actions;
