import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CounterContainer from './containers/CounterContainer'
// import PostListContainer from './containers/PostListContainer'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'

function App() {
  return (
    <>
      <div style={{margin: '1rem'}}>
        <CounterContainer></CounterContainer>
      </div>
      <hr />
      <div style={{margin: '1rem'}}>
        <Router>
          <Routes>
            <Route path="/" element={<PostListPage />}></Route>
            <Route path="/:id" element={<PostPage />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App


/**리덕스 사용하면 좋은 상황
 * 1. 상태를 전역적으로 사용해야 할 때
 * 2. 비동기 작업을 자주 할 때
 */