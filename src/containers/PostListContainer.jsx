import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

export default function PostListContainer(){
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  //컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    if(data) return;
    dispatch(getPosts());
  }, [dispatch]);

  if(loading && !data) return <div>로딩중...</div> //로딩중이면서, 데이터가 없을때만 호출
  if(error) return <div>에러 발생!</div>
  if(!data) return null
  return <PostList posts={data}></PostList>
}