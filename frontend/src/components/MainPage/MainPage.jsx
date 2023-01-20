import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'
import { useEffect, useState } from "react";
import MessengerModalTab from "./MessengerModal/MessengerModalTab";
import MessengerModal from "./MessengerModal/MessengerModal";
import { useDispatch, useSelector } from "react-redux";
import { clearGroups, fetchGroup, fetchGroups } from "../../store/group";
import { Redirect, useParams } from "react-router";

export default function MainPage() {
  //Added to manage the messenger
  const [messengerModal, setMessengerModal] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const {groupId} = useParams();

  useEffect(() => {
    if(sessionUser){
      dispatch(fetchGroups())
    }

  },[dispatch, sessionUser] )

  useEffect(() => {
    if(groupId){
      dispatch(clearGroups())
      dispatch(fetchGroup(groupId))
    }
  }, [groupId])


  if(!sessionUser) return <Redirect to="/"/>
  return (
    <div className="mainpage">
      <Map />
      <MainPageRestaurants />
    
      {/* {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>} */}
      <MessengerModal />
    </div>
  );
}
