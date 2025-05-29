import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Footer from './Components/Footerco'
import ValidationPh from './pages/ValidationPh'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import TermsOfUse from './pages/TermsOfUse'
import AboutUs from './pages/AboutUs'
import Sellsomething from './pages/SellSomething'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/sign-up' element={<SignUp/>}/> 
        <Route path='/sign-in' element={<SignIn/>}/> 
        <Route path='/validation-phar' element={<ValidationPh/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/forgot-password' element={<ForgotPassword/>}/> 
        <Route path='/terms' element={<TermsOfUse/>}/> 
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/post' element={<Sellsomething/>}/>
        {/* <Route path="/post/:id" element={<PostForm />} />  */}
        {/* <Route path="/ProfilePage/:id" element={<ProfilePage />} />  */}
        {/* i have to put the right /post path here*/}
      </Routes>
      <Footer/>
    </div>
  )
}
export default App
