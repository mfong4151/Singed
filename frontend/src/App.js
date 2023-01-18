import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/Navbar';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
// import Profile from './components/Profile/Profile';
import { getCurrentUser } from './store/session';
import AllergiesDietForm from './components/AllergiesDietForm/AllergiesDietForm';
import Map from './components/Map';
import SurveyForm from './components/SurveyForm/SurveyForm';
import Footer from './components/Footer/Footer';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch >
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route exact path="/allergies_diet" component={AllergiesDietForm}/>
        <Route exact path="/dish_survey" component={SurveyForm}/>
        <Route exact path="/map" component={Map}/>
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
