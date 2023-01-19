import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDish, fetchDishes } from "../../store/dish";
import './SurveyForm.css'
function SurveyForm () {
    const dispatch = useDispatch();
    const dishes = useSelector((store) => store.dishes)
    const sessionUser = useSelector((store) => store.session.user)
    const [prefernce, setPrefernce] = useState("")

    useEffect(() => {
        dispatch(fetchDishes())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <div className="dish-survey-container">
                <div className="dish-form-container">
                    <h1>Which dishes do you like?</h1>
                    <form onSubmit={handleSubmit} className="dishes-form-grid">
                        <div className="dishes-form-grid-inputs">
                            {Object.values(dishes)?.map((dish) => (
                                <div className="dish-item" key={dish?._id} >
                                    <input
                                        type="checkbox" id={`dish-survey-${dish?.name}`}
                                        checked={prefernce}
                                        onChange={(e) => {setPrefernce(e.target.checked)}} />
                                    <label for={`dish-survey-${dish?.name}`}>
                                        <p>{dish?.name}</p>
                                        <img
                                            src={dish?.imageUrl}
                                            alt={`${dish?.name}-img`}
                                            className="dish-image"/>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default SurveyForm;