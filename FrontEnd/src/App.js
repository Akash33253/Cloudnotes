import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null); // object banaye hai
  let showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/' Component={()=><Home showAlert={showAlert}/>}/>
              <Route exact path='/about' Component={About} />
              <Route exact path='/login' Component={()=><Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' Component={()=><SignUp showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
