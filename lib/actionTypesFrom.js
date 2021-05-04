export default function actionTypesFrom(actionsOfReduxTookitSlice) {
  const actionNames = Object.keys(actionsOfReduxTookitSlice);
  const actions = Object.values(actionsOfReduxTookitSlice);

  return actionNames.reduce((acc, currActionName, idx) => {
    // redux-toolkit slice의 actions는 toString() 했을때 symbol의 액션 타입을 반환
    acc[currActionName] = actions[idx].toString();
    return acc;
  }, {});
}
