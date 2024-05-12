import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './component/Signup'
import  Signin  from './component/Signin'
import  Home  from './component/Home/Home'
import CreateBlog from './component/Blog/CreateBlog'
import Profile from './component/profile/Profile'
import ViewBlog from './component/Blog/ViewBlog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path='/blog/CreateBlog' element={<CreateBlog/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/blog/ViewBlog/:blogid' element={<ViewBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App