import styles from './App.module.css';
import { Button, Container } from 'react-bootstrap';
import NavBar from './components/NavBar';

import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import AddImageForm from './pages/images/AddImageForm';


function App() {

  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Body}>
      <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/login" render={() => <LogInForm/> } />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/images/add" render={() => <AddImageForm/> } />
          <Route render={() => <h1>Page not found! :(</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;