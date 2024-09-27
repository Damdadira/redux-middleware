import * as postsAPI from '../api/posts' //api/posts안의 함수 모두 불러오기
import { createPromiseThunk, reducerUtils, handleAsyncActions, createPromiseThunkById, handleAsyncActionsById } from '../lib/asyncUtils';

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
 * post 비우기
 */
const CLEAR_POST = 'CLEAR_POST';

/**
 * thunk 함수 만들기
 */
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({type: CLEAR_POST});

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
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