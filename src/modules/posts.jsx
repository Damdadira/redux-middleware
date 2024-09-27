import * as postsAPI from '../api/posts' //api/posts안의 함수 모두 불러오기
import { createPromiseThunk, reducerUtils, handleAsyncActions, createPromiseThunkById, handleAsyncActionsById, createPromiseSaga, createPromiseSagaById } from '../lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects'

/**
 * post 여러개 조회하기 
*/
const GET_POSTS = 'GET_POSTS'; //요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; //요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; //요청 실패

/**
 * post 하나 조회하기
*/
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

/**
 * thunk 함수 만들기
 */
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

/**
 * saga 함수 만들기
 */
export const getPosts = () => ({type: GET_POSTS});
export const getPost = id => ({type: GET_POST, payload: id, meta: id}) //payload: 파라미터, meta: reducer에서 id를 알기 위한 용도

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSaga(GET_POST, postsAPI.getPostById);

/**
 * 사가들을 합치기
 */
export function* postsSaga(){
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

/**
 * useNavigate > 홈 바로가기 기능
 */
export const goToHome = (navigate) => (dispatch, getState) => {
  // console.log(getState().posts);
  dispatch({type: 'GET_POSTS'})
  navigate("/");
};

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
}

export default function posts(state = initialState, action){
  switch(action.type){
    case GET_POSTS: 
    case GET_POSTS_SUCCESS: 
    case GET_POSTS_ERROR: 
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
    default:
      return state;
  }
}

