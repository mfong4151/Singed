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


export default function MainPage() {
  // const location = useLocation();
  let preference

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
  // const [groupNow, setGroupNow] = useState(group)

  if (group) {
    preference = group.flavorProfile
    console.log("final group", preference);
  } else {
    preference = sessionUser.flavorProfile
    console.log("final solo", preference);

  }

  useEffect(() => {
    if(sessionUser){
      dispatch(fetchGroups())
    }

    if(groupId){
      dispatch(clearGroups())
      dispatch(fetchGroup(groupId))
    }

    let lat =  37.779180920571605;
    let lng =  -122.42151230151367;
    // dispatch(fetchRestaurantsCoordinate({lat, lng}))
    dispatch(fetchRestaurantsCoordinatePreference({lat, lng, preference}))

  },[dispatch, sessionUser, groupId] )

  if(!sessionUser) return <Redirect to="/"/>
  console.log(sessionUser._id)


  return (
    <div className="mainpage">
      <div className="solo-group-banner">
        {group
          ? <h1>Group: {group?.name} Recommdentation</h1>
          : <h1>User: {sessionUser._id} Recommdentation</h1>
        }
      </div>
      <div className="mainpage-content">
        <Map restaurants={restaurants} preference={preference} />
        <MainPageRestaurants restaurants={restaurants}/>
      </div>

      {/* {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>} */}
      <MessengerModal />
    </div>
  );
}
