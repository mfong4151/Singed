import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'
import { useEffect, useState } from "react";
import MessengerModalTab from "./MessengerModal/MessengerModalTab";
import MessengerModal from "./MessengerModal/MessengerModal";
import { useDispatch, useSelector } from "react-redux";
import { clearGroups, fetchGroup, fetchGroups } from "../../store/group";
import { Redirect, useParams } from "react-router";
import {fetchRestaurantsCoordinatePreference} from '../../store/restaurant'
import { useRef } from "react";
import { useHistory } from "react-router";

export default function MainPage() {
  // const location = useLocation();

  // if (location.state) {
  //   preference = location.state.from;
  //   console.log("mainpage-preference", preference);
  // } else {
  //   console.log('in else')
  //   preference = new Array(5).fill(0.447);
  // }

  //Added to manage the messenger
  const [messengerModal, setMessengerModal] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const {groupId} = useParams();
  const group = useSelector((store) => store.groups[groupId]);
  const restaurants = useSelector(state => state.restaurants);
  const restaurantsRef = useRef()
  let preference

  if (group) {
    preference = group.flavorProfile
  } else if(sessionUser) {
    preference = sessionUser.flavorProfile
  }
  
  useEffect(() => {
    if(sessionUser){
      dispatch(fetchGroups(sessionUser._id))
    }
    
    if(groupId){
      // dispatch(clearGroups())
      dispatch(fetchGroup(groupId))
    }
    
    let lat =  37.779180920571605;
    let lng =  -122.42151230151367;
    // dispatch(fetchRestaurantsCoordinate({lat, lng}))
    if(preference) dispatch(fetchRestaurantsCoordinatePreference({lat, lng, preference}))
  },[dispatch, sessionUser, groupId] )
  
  if(!sessionUser) return <Redirect to="/"/>
  

  return (
    <div className="mainpage">
      <div className="mainpage-left">
        <div className="main-banner">
          {group
            ? <h1>Welcome {group?.name}</h1>
            : <h1>Welcome {sessionUser.username}</h1>
          }
        </div>
        <Map restaurants={restaurants} preference={preference} />
      </div>
      
      <div className="mainpage-right">
        <div className="mainpage-content">
          <MainPageRestaurants restaurants={restaurants}/>
        </div>
      </div>

      {/* {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>} */}

      {groupId ? 
       <MessengerModal /> :
       null}

    </div>
  );
}
