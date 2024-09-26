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
          [key]: reducerUtils.error(action.error)
        }
      default:
        return state;
    }
  }
}