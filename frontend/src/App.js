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
import SplashPage from './components/SplashPage/SplashPage';
import UpdatePreferences from './components/UpdatePreferences';
import PageNotFound from './components/PageNotFound/PageNotFound';

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
        <Route exact path="/groups/:groupId" component={MainPage} />
        <Route exact path="/main" component={MainPage}/>
        <AuthRoute exact path="/" component={SplashPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/allergies_diet" component={AllergiesDietForm}/>
        <ProtectedRoute exact path="/dish_survey" component={SurveyForm}/>
        <Route exact path="/map" component={Map}/>
        <Route exact path='/update_preferences' component={UpdatePreferences} />
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        <Route component={PageNotFound} />

      </Switch>
      <Footer />
    </>
  );
}

export default App;
