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
import { useCurrUser } from './contexts/CurrUserContext';
import EditImageForm from './pages/images/EditImageForm';
import AccountPage from './pages/accounts/AccountPage';


function App() {
  const currUser = useCurrUser();
  const account_id = currUser?.account_id || "";

  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Body}>
      <Switch>
          <Route exact path="/" render={() => <ImagesPage/> } />
          <Route exact path="/main" render={() => <ImagesPage 
          message="No Images to show yet, please follow some users to see conent!"
          filter={`owner__followed__owner__account=${account_id}&`}/> } />
          <Route exact path="/kudos" render={() => <ImagesPage 
          message="You haven't given kudos to any images yet :("
          filter={`kudos__owner__account=${account_id}&ordering=-kudos__created_on&`}/> } />
          <Route exact path="/login" render={() => <LogInForm/> } />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/images/add" render={() => <AddImageForm/> } />
          <Route exact path="/images/:id/edit" render={() => <EditImageForm/> } />
          <Route exact path="/images/:id" render={() => <ImageDetailPage/> } />
          <Route exact path="/accounts/:id" render={() => <AccountPage/> } />
          <Route render={() => <h1>Page not found! :(</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;