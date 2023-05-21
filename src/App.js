import { Routes,Route } from "react-router-dom";
import AuthForm from './Component/LoginForm/AuthForm';
import LoggeinPage from "./Component/LoggedInPage/LoggeinPage";
// import { useSelector } from "react-redux";

function App() {
  // const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  return (
    <div >
      <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/loggedin" element={<LoggeinPage/>} />
      </Routes>
   
    </div>
  );
}

export default App;
