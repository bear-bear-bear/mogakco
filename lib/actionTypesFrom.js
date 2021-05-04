export default function actionTypesFrom(actionsOfReduxTookitSlice) {
  // redux-toolkit slice.actions의 각 프로퍼티는 toString() 했을때 symbol의 액션 타입을 반환합니다.
  return Object.fromEntries(
    Object.entries(actionsOfReduxTookitSlice) //
      .map(([key, value]) => [key, value.toString()]),
  );
}
