import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import posts, { postsSaga } from './posts';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({counter, posts});
export function* rootSaga(){
  yield all([counterSaga(), postsSaga()]); //all은 배열안의 여러 사가를 동시에 실행시켜줌
}

export default rootReducer;