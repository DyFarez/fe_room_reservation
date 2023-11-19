import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login } from './app/pages/Login'
import { Room } from './app/pages/room/Room';
import { Provider } from 'react-redux';
import roomStore from './app/redux/store';
import { isLogin } from './app/auth/loginAuth';

// let verifyLogin = await isLogin();

function App() {
  return (
    <Provider store={roomStore} >
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/room'>
            <Room />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
