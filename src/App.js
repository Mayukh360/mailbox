import { Routes,Route } from "react-router-dom";
import AuthForm from './Component/LoginForm/AuthForm';
import LoggeinPage from "./Component/LoggedInPage/LoggeinPage";
import Navbar from "./Component/Navbar/Navbar";
import Inbox from "./Component/LoggedInPage/Inbox";
import Sentmail from "./Component/LoggedInPage/Sentmail";
import './App.css'
// import { useSelector } from "react-redux";

function App() {
  // const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  return (
    <div >
      <Navbar/>
      <Routes>
      <Route path="/mailbox" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggeinPage/>} />
      <Route path="/inbox" element={<Inbox/>} />
      <Route path="/sentmail" element={<Sentmail/>} />
      </Routes>
   
    </div>
  );
}

export default App;
