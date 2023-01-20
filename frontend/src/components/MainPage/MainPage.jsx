import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'
import { useEffect, useState } from "react";
import MessengerModalTab from "./MessengerModal/MessengerModalTab";
import MessengerModal from "./MessengerModal/MessengerModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../store/group";
import { useLocation } from "react-router-dom";

export default function MainPage({location}) {
  // const location = useLocation();
  let preference
  if (location.state) {
    preference = location.state.from;
    console.log("mainpage-preference", preference);
  } else {
    preference = new Array(5).fill(0.447);
  }
  //Added to manage the messenger
  const [messengerModal, setMessengerModal] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(sessionUser){
      dispatch(fetchGroups())
    }
  },)

  return (
    <div className="mainpage">
      <Map preference={preference}/>
      <MainPageRestaurants preference={preference}/>

      {/* {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>} */}
      <MessengerModal />
    </div>
  );
}
