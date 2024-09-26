import React from 'react';
import { useParams } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';

export default function PostPage(){
  const { id } = useParams(); //url 파라미터 조회하기

  return <PostContainer postId={parseInt(id, 10)}></PostContainer>
}