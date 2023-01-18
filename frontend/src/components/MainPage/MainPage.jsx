import Map from "../Map";
import MainPageRestaurants from './MainPageRestaurants'
import './MainPage.css'

export default function MainPage() {
  return (
    <div className="mainpage">
      <Map />
      <MainPageRestaurants />
    </div>
  );
}
