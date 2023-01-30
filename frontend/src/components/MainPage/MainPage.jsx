import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'
import { useEffect, useState } from "react";
import MessengerModalTab from "./MessengerModal/MessengerModalTab";
import MessengerModal from "./MessengerModal/MessengerModal";
import { useDispatch, useSelector } from "react-redux";
import { clearGroups, fetchGroup, fetchGroups } from "../../store/group";
import { Redirect, useParams } from "react-router";

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
  const {groupId} = useParams();
  const group = useSelector((store) => store.groups[groupId]);
  const [groupNow, setGroupNow] = useState(group)

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
  console.log(sessionUser._id)
  return (
    <div className="mainpage">
      <div className="mainpage-left">
        <div className="main-banner">
          {group
            ? <h1>Welcome {group?.name}</h1>
            : <h1>Welcome {sessionUser.username}</h1>
          }
        </div>
        <Map preference={preference}/>
      </div>
      
      <div className="mainpage-right">
        <div className="mainpage-content">
          <MainPageRestaurants preference={preference}/>
        </div>
      </div>

      {/* {!messengerModal && <MessengerModalTab messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>}
      {messengerModal && <MessengerModal messengerModal={messengerModal} setMessengerModal={setMessengerModal}/>} */}
      <MessengerModal />
    </div>
  );
}
