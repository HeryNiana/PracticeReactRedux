import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
//import Login from './components/Login';
//about the second login
import  Form from './component/Form';
import Home from './components/Home';
import  Data from './components/okay';
//about_the_crud
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <Route exact path="/" component={ Home } />
                <div className="container">
                <Switch>
                    <Route exact path='/create' component={ Create } />
                    <Route path='/edit/:id' component={ Edit } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Form } />
                    <Route path='/index' component={ Index } />
                    <Route exact path='/data' component={ Data } />

              </Switch>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
