import './App.css'
import {Routes, Route} from 'react-router-dom'
import useDarkMode from "./hooks/UseDarkMode"; 
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Footer from './Components/Footerco';
import ValidationPh from './pages/ValidationPh';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import TermsOfUse from './pages/TermsOfUse';
import AboutUs from './pages/AboutUs';
import Sellsomething from './pages/SellSomething';
import LogChatbot from "./pages/loginchatbot";
import Chatbot from "./pages/ChatbotUser";
import ProfilePage from "./pages/Accounts";
import Dashboard from "./pages/Dashboard";
import TeamPage from "./pages/TeamPage";
function App() {
   const [darkMode] = useDarkMode();
  return (
    
       <div className={darkMode ? "dark" : ""}>
           <div className="screen-h screen-w flex flex-col overflow-x-hidden dark:bg-black dark:text-white min-h-screen transition-colors duration-300">

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
      <Route path="/loginchatbot" element={<LogChatbot />} />
 
        <Route path="pharmacists" element={<PharmacistsButton />} />
          <Route path="messages" element={<RepportedMesseges />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/ProfilePage/:id" element={<ProfilePage />} />

     <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/TeamPage" element={<TeamPage />} />

          
      </Routes>
      <Footer/>
    </div>     <div>
    </div>
    </div>
  )
}
export default App
