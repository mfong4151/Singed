import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDishes, fetchSurveyDishes } from "../../store/dish";
import './SurveyForm.css'

function SurveyForm () {
    const dispatch = useDispatch();
    const dishes = useSelector((store) => store.dishes)
    const sessionUser = useSelector(state => state.session.user)
    const [prefernce, setPrefernce] = useState("")
    const history = useHistory();

    // if (dishes) {
        // console.log(dishes);
        // console.log(Object.values(dishes).dishes.length)
        // console.log("in dish")
        // console.log(Object.values(dishes).length)
    // }

    useEffect(() => {
        if (sessionUser) {
            const constraints = {
                allergies: sessionUser.allergies,
                diet: sessionUser.diet
            }
            dispatch(fetchSurveyDishes(constraints))
            // dispatch(fetchDishes(constraints))
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/main')
    }
    return(
        <div className="dish-survey-container">
            <div className="dish-form-container">
                <h1>Which dishes do you like?</h1>
                <h2>Recommended food based on your profile.</h2>
                <h2>Allergic to: {JSON.stringify(sessionUser.allergies)}</h2>
                <h2>Diet preference: {JSON.stringify(sessionUser.diet)}</h2>
                <form onSubmit={handleSubmit} className="dishes-form-grid">
                    <div className="dishes-form-grid-inputs">
                        {Object.values(dishes).length==0 &&  <h1 className="">0 food available</h1>}
                        {Object.values(dishes).length>1 && Object.values(dishes).map((dish) => (
                            <div className="dish-item" key={dish._id} >
                                <input
                                    type="checkbox" id={`dish-survey-${dish.name}`}
                                    checked={prefernce}
                                    onChange={(e) => {setPrefernce(e.target.checked)}} />
                                <label for={`dish-survey-${dish.name}`}>
                                    <p>{dish.name}</p>
                                    <p>allergies: {JSON.stringify(dish.allergies)}</p>
                                    <p>diet: {JSON.stringify(dish.diet)}</p>
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
