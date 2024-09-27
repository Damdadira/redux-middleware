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
