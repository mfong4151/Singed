import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'
import { useState } from "react";
import MessengerModalTab from "./MessengerModal/MessengerModalTab";
import MessengerModal from "./MessengerModal/MessengerModal";

export default function MainPage() {
  //Added to manage the messenger
  const [messengerModal, setMessengerModal] = useState(false)

  


  return (
    <div className="mainpage">
      <Map />
      <MainPageRestaurants />
    
      {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
    </div>
  );
}
