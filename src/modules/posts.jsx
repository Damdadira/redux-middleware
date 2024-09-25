import * as postsAPI from '../api/posts' //api/posts안의 함수 모두 불러오기

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

export const getPosts = () => async dispatch => {
  dispatch({type: GET_POSTS}); //요청이 시작됨
  try{
    const posts = await postsAPI.getPosts(); //api 호출
    dispatch({type: GET_POSTS_SUCCESS, posts}); //성공
  }
  catch(e){
    dispatch({type: GET_POSTS_ERROR, error: e}); //실패
  }
}

export const getPost = id => async dispatch => {
  dispatch({type: GET_POST}); //요청이 시작됨
  try{
    const post = await postsAPI.getPostById(id); //api 호출
    dispatch({type: GET_POST_SUCCESS, post}); //성공
  }
  catch(e){
    dispatch({type: GET_POST_ERROR, error: e}); //실패
  }
}

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null
  },
  post: {
    loading: false,
    data: null,
    error: null
  }
}

export default function posts(state = initialState, action){
  switch(action.type){
    case GET_POSTS: case GET_POST:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      }
    case GET_POSTS_SUCCESS: case GET_POST_SUCCESS:
      return {
        ...state,
        posts: {
          loading: true,
          data: action.posts,
          error: null
        }
      }
    case GET_POSTS_ERROR: case GET_POST_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error
        }
      }
    default:
      return state;
  }
}