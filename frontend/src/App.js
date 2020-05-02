import React from 'react';
import NavBar from './components/Navbar';
import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Category from './views/Category';
import PrivateRoute from './components/PrivateRoute';
import history from './utils/history';
import Container from 'react-bootstrap/Container';

function App() {
  const { loading } = useAuth0();

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Router history={history} >
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile}  />
          <Route path="/categories" component={Category}  />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
