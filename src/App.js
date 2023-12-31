import './App.css';
import {BrowserRouter,Route,Routes, useNavigate} from "react-router-dom"
import Navbar from './components/layout/Navbar';
import BlogSection from './components/blogs/BlogSection';
import Home from './components/home/Home';
import CreateBlog from './components/blogs/CreateBlog';
import Login from './components/users/Login';
import Admin from './components/users/Admin';
import Protected from './components/users/Protected';
import { useEffect, useState } from 'react';
import Article from './components/article/Article';
function App() {
  const [userData,setUserData]=useState()
  
  const getFromLoginData=(data)=>{
   setUserData(data)
   }
   const logoutAdmin=(navigate)=>{
    localStorage.removeItem('user')
    setUserData(null)
    navigate('/')
  }
   useEffect(()=>{
     if (localStorage.getItem("user")) {
       let localUser=localStorage.getItem("user")
       let parseData=JSON.parse(localUser)
       setUserData(parseData)
     }
       },[])
  return (
    <div>
      <BrowserRouter>
      <Navbar userData={userData} logoutAdmin={logoutAdmin}/>
      <Routes>
        <Route path='/' element={<Home getFromLoginData={getFromLoginData}/>}/>
        <Route path='/blogs' element={<BlogSection/>}/>
        <Route path='/create' element={<CreateBlog/>}/>
        <Route path='/article/:name' element={<Article/>}/>
        <Route path='/create/:id' element={
          <Protected>
            <CreateBlog/>
          </Protected>
        }/>
        <Route path='/login' element={<Login getFromLoginData={getFromLoginData}/>}/>
        <Route path='/admin' element={
          <Protected>
            <Admin />
          </Protected>
        }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
