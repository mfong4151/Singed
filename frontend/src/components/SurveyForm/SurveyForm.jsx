import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDish, fetchDishes } from "../../store/dish";

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
                    <form onSubmit={handleSubmit}>
                        {Object.values(dishes)?.map((dish) => (
                            <div className="dish-item" key={dish?._id}>
                                <p>{dish?.name}</p>
                                <img 
                                    src={dish?.imageUrl}
                                    alt={`${dish?.name}-img`}
                                    className="dish-image"/>
                                <input 
                                    type="checkbox"
                                    checked={prefernce}
                                    onChange={(e) => {setPrefernce(e.target.checked)}} />
                            </div>
                        ))}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default SurveyForm;