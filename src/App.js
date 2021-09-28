import { Signup } from './Component/Signup/Signup.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Login from './Component/Login/Login.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">    
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
