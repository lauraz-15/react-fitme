import styles from './App.module.css';
import { Button, Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Body}>
      <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
          <Route render={() => <h1>Page not found! :(</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;