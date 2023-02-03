import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDishes, fetchSurveyDishes } from "../../store/dish";
import { getCurrentUser } from "../../store/session";
import { updateUser } from "../../store/user";
import './SurveyForm.css'



function SurveyForm () {
    const dispatch = useDispatch();
    // const authUser = async () => {
        // await dispatch(getCurrentUser());
    // }
    // authUser()
    const dishes = useSelector((store) => Object.values(store.dishes))
    const sessionUser = useSelector(state => state.session.user)
    const [checkedState, setCheckedState] = useState(
        new Array(12).fill(false)
    );

    const history = useHistory();
    const [flavorProfileTotal, setFlavorProfileTotal] = useState([0,0,0,0,0])
    const [dishCount, setDishCount] = useState(0);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        setCheckedState(updatedCheckedState);
      
        let dishFlavorProfile = dishes[position].flavorProfile;
        if (checkedState[position]===false) {
            setDishCount(dishCount => dishCount+1);
            setFlavorProfileTotal(flavorProfileTotal.map((num, index) => num + dishFlavorProfile[index]))
        }

    }
;
    useEffect(() => {
        if (sessionUser) {
            const constraints = {
                allergies: sessionUser.allergies,
                diet: sessionUser.diet
            }
            dispatch(fetchSurveyDishes(constraints))
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalPreference = flavorProfileTotal.map(n => n/dishCount)
        let updatedUser;
        if (sessionUser) {
            updatedUser = {...sessionUser,
                        ...{id: sessionUser._id,
                        flavorProfile: finalPreference}
            }
        }

        dispatch(updateUser(updatedUser));
        // history.push('/main', {from: finalPreference})
        history.push('/main')
    }

    return(
        <div className="dish-survey-container">
            <div className="dish-form-container">
                <h1>Which dishes do you like?</h1>
                <h2>Recommended food based on your profile.</h2>
                {/* <h2>Allergic to: {JSON.stringify(sessionUser.allergies)}</h2>
                <h2>Diet preference: {JSON.stringify(sessionUser.diet)}</h2> */}
                <form onSubmit={handleSubmit} className="dishes-form-grid">
                    <div className="dishes-form-grid-inputs">
                        {dishes.length==0 &&  <h1 className="">0 food available</h1>}
                        {dishes.length>1 && dishes.map((dish, index) => (
                            <div className="dish-item" key={dish._id} >
                                <input
                                    type="checkbox" id={`dish-survey-${dish.name}`}
                                    checked={checkedState[index]} value={dish.flavorProfile} name={index}
                                    onChange={() => {handleOnChange(index)}} />
                                <label htmlFor={`dish-survey-${dish.name}`}>
                                    <p>{dish.name}</p>
                                    {/* <p>allergies: {JSON.stringify(dish.allergies)}</p>
                                    <p>diet: {JSON.stringify(dish.diet)}</p> */}
                                    <img
                                        src={dish.imageUrl}
                                        alt={`${dish.name}-img`}
                                        className="dish-image"/>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="survey-submit-button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SurveyForm;
