import styles from './App.module.css';
import { Button, Container } from 'react-bootstrap';
import NavBar from './components/NavBar';

import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import axios from 'axios';
import { useEffect } from 'react';

export const CurrUserContext = createContext()
export const SetCurrUserContext = createContext()

function App() {
  const [currUser, setCurrUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrUser(data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrUserContext.Provider value={currUser}>
      <SetCurrUserContext.Provider value={setCurrUser}>
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Body}>
      <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/login" render={() => <LogInForm/> } />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route render={() => <h1>Page not found! :(</h1>} />
        </Switch>
      </Container>
    </div>
    </SetCurrUserContext.Provider>
    </CurrUserContext.Provider>
  );
}

export default App;