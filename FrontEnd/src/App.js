import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Error404 from "./Error404";

function App() {
  const user=JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<Signup/>}/>
          <Route exact path="/login" element={<Signin/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
