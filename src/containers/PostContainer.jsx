import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, goToHome } from '../modules/posts';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';

export default function PostContainer({postId}){
  const { data, loading, error } = useSelector(state => state.posts.post[postId]) || {
    loading: false,
    data: null,
    error: null
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if(loading && !data) return <div>로딩중...</div>
  if(error) return <div>에러 발생!</div>
  if(!data) return null;

  return (
    <>
      <button style={{background: '#6bba8d', color: '#fff'}} onClick={() => dispatch(goToHome(navigate))}>홈으로 이동</button>
      <Post post={data}></Post>
    </>
  )
}