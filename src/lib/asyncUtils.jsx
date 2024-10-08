import { call, put } from 'redux-saga/effects'

/**
 * Promise에 기반한 Thunk를 만들어주는 함수
 */
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  
  /**
   * 이 함수는 promiseCreator가 하나의 파라미터만 받는다는 전제하에 작성
   * 만약 여러 종류의 파라미터를 전달해야 한다면 객체 타입의 파라미터를 받아오도록
   * 예: writeComment({postId: 1, text: '댓글 내용'})
   */

  return param => async dispatch => {
    dispatch({type, param}); //요청 시작
    try{
      //결과물의 이름을 payload라는 이름으로 통일
      const payload = await promiseCreator(param);
      dispatch({type: SUCCESS, payload}); //성공
    }
    catch(e){
      dispatch({type: ERROR, payload: e, error: true}); //실패
    }
  }
}

/**
 * Promise를 기다렸다가 결과를 dispatch하는 saga
 */
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return function* saga(action){
    try{
      //재사용성을 위하여 promiseCreator의 파라미터엔 action.payload 값을 넣도록 함
      const payload = yield call(promiseCreator, action.payload);
      yield put({type: SUCCESS, payload});
    }
    catch(e){
      yield put({type: ERROR, error: true, payload: e});
    }
  }
}

/**
 * 특정 id의 데이터를 조회하는 용도로 사용하는 사가
 * api를 호출할 때 파라미터는 action.payload를 넣고, id 값을 action.meta로 설정
 */
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return function* saga(action){
    const id = action.meta;
    try{
      const payload = yield call(promiseCreator, action.payload);
      yield put({type: SUCCESS, payload, meta: id});
    }
    catch(e){
      yield put({type: ERROR, error: e, meta: id});
    }
  }
}

/**
 * reducer에서 사용할 수 있는 여러 유틸 함수들
 */
export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: payload => ({
    loading: false,
    data: payload,
    error: null
  }),
  error: error => ({
    loading: false,
    data: null,
    error: error
  })
}

/**
 * 비동기 관련 액션들을 처리하는 reducer를 만들어줌
 * type: action.type, key: state.key
 */
export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return(state, action) => {
    switch(action.type){
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state;
    }
  }
}

/**
 * idSelector
 * 1. 파라미터에서 id를 어떻게 선택할지 정의하는 함수
 * 2. 기본값으로는 파라미터 그대로 id를 사용
 * 3. 만약 파라미터가 {id:1, details: true} 이런 형태라면 param => param.id로 설정할 수 있음
 */
/**
 * 특정 id를 처리하는 thunk 생성함수
 */
const defaultIdSelector = param => param;
export const createPromiseThunkById = (type, promiseCreator, idSelector = defaultIdSelector) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,  `${type}_ERROR`];

  return param => async dispatch => {
    const id = idSelector(param);
    dispatch({type, meta: id});
    try{
      const payload = await promiseCreator(param);
      dispatch({type: SUCCESS, payload, meta: id});
    }
    catch(e){
      dispatch({type: ERROR, error: true, payload: e, meta: id});
    }
  }
}

/**
 * id별로 처리하는 유틸함수
 */
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,  `${type}_ERROR`];

  return(state, action) => {
    const id = action.meta;
    switch(action.type){
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              //유효성 검사(state[key][id]가 만들어져 있지 않을수도 있기 때문)
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        }
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        }
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        }
      default:
        return state;
    }
  }
}