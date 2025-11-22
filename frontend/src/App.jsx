import React from 'react'
import { Routes, Route } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const {authUser,isloggedIn,login} = useAuthStore();
  console.log("authUser",authUser);
  console.log("IsloggedIn",isloggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 -left-4 size-96 -500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96  opacity-20 blur-[100px]" />
      <button onClick={login} className='z-10'>Login</button>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    </div>
  )
}

export default App