import styles from './App.module.css';
import { Button, Container } from 'react-bootstrap';
import NavBar from './components/NavBar';

import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import AddImageForm from './pages/images/AddImageForm';
import ImageDetail from './pages/images/ImageDetailPage';
import ImageDetailPage from './pages/images/ImageDetailPage';
import ImagesPage from './pages/images/ImgesPage';


function App() {

  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Body}>
      <Switch>
          <Route exact path="/" render={() => <ImagesPage/> } />
          <Route exact path="/login" render={() => <LogInForm/> } />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/images/add" render={() => <AddImageForm/> } />
          <Route exact path="/images/:id" render={() => <ImageDetailPage/> } />
          <Route render={() => <h1>Page not found! :(</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;