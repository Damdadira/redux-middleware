const myLogger = store => next => action => {
  console.log(action); //액션 출력

  const result = next(action);

  console.log('\t', store.getState()) //store 출력

  return result;
}

export default myLogger;