import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSurveyDishes } from "../../store/dish";
import './SurveyForm.css'

function SurveyForm () {
    const dispatch = useDispatch();
    const dishes = useSelector((store) => store.dishes)
    const sessionUser = useSelector(state => state.session.user)
    const [prefernce, setPrefernce] = useState("")
    const history = useHistory();

    if (dishes) {
        console.log(dishes);
        console.log(Object.values(dishes).length)
        console.log("in dish")
    }
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
        history.push('/')
    }
    return(
        <div className="dish-survey-container">
            <div className="dish-form-container">
                <h1>Which dishes do you like?</h1>
                <form onSubmit={handleSubmit} className="dishes-form-grid">
                    <div className="dishes-form-grid-inputs">
                        {Object.values(dishes).length>1 && Object.values(dishes).map((dish) => (
                            <div className="dish-item" key={dish._id} >
                                <input
                                    type="checkbox" id={`dish-survey-${dish.name}`}
                                    checked={prefernce}
                                    onChange={(e) => {setPrefernce(e.target.checked)}} />
                                <label for={`dish-survey-${dish.name}`}>
                                    <p>{dish.name}</p>
                                    <img
                                        src={dish.imageUrl}
                                        alt={`${dish.name}-img`}
                                        className="dish-image"/>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SurveyForm;
