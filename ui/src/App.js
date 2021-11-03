import Home from './components/Home';
import Reg from './components/reg'
import Login from './components/Login'
import MainProfile from './components/MainProfile'
import './App.css';
import { useContext } from 'react';
import {Context} from './context/Context'
import Mess from './components/Messenger/Mess'
import {
  BrowserRouter as Router,
  Switch,Redirect,
  Route
} from "react-router-dom";
import EditProfile from './components/EditProfile';

function App() {
  const {user}=useContext(Context)

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
          {user?<Home/> :<Login/>}
          </Route>
          <Route exact path="/login">
          {user?<Redirect to='/' /> :<Login/>}
        </Route>
        <Route exact path="/register">
         <Reg/>
         </Route>
         <Route exact path="/MainProfile/:username">
         <MainProfile />
         </Route>
         <Route exact path="/editprofile">
         <EditProfile />
         </Route>
         <Route exact path="/message">
         <Mess />
         </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
