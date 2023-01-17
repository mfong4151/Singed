import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AllergiesDietForm() {
    // const sessionUser = useSelector((store) => store.session.user);
    // const allergies = sessionUser.allergies;
    // const diet = sessionUser.diet;
    // const shellfish = allergies.shellfish;
    // const fish = allergies.fish;
    // const nuts = allergies.nuts;
    // const vegan = diet.vegan;
    // const gluten = diet.gluten;
    // const lactose = diet.lactose;
    const [shellfishAllergy, setShellfishAllergy] = useState(false);
    const [fishAllergy, setFishAllergy] = useState(false);
    const [nutsAllergy, setNutsAllergy] = useState(false);
    const [veganDiet, setVeganDiet]  = useState(false);
    const [glutenDiet, setGlutenDiet]  = useState(false);
    const [lactoseDiet, setLactoseDiet]  = useState(false);
    const dispatch = useDispatch();

    // const updatedUser = {
    //     id: sessionUser.id,
    //     shellfish: shellfishAllergy,
    //     fish: fishAllergy,
    //     nuts: nutsAllergy,
    //     vegan: veganDiet,
    //     gluten: glutenDiet,
    //     lactose: lactoseDiet
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(updateUser(updatedUser))
            // don't have thunk for this yet
        // render survey page of food image items based off of these allergies and dietary restrictions
    }

    return (
        <div className="allergies-diet-form-parent">
            <div className="allergies-diet-form-container">
                <form className="allergies-diet-form" onSubmit={handleSubmit}>
                    <div className="allergies-form">
                        <p>Allergies</p>
                        <label>Shellfish
                            <input 
                                type="checkbox"
                                checked={shellfishAllergy}
                                onChange={(e) =>{setShellfishAllergy(e.target.checked)}} />
                        </label>
                        <label>Fish
                            <input 
                                type="checkbox"
                                checked={fishAllergy}
                                onChange={(e) =>{setFishAllergy(e.target.checked)}} />
                        </label>
                        <label>Nuts
                            <input 
                                type="checkbox"
                                checked={nutsAllergy}
                                onChange={(e) =>{setNutsAllergy(e.target.checked)}} />
                        </label>

                    </div>
                    <div className="diet-form">
                        <p>Dietary Restrictions</p>
                        <label>Vegan
                            <input 
                                type="checkbox"
                                checked={veganDiet}
                                onChange={(e) =>{setVeganDiet(e.target.checked)}} />
                        </label>
                        <label>Gluten
                            <input 
                                type="checkbox"
                                checked={glutenDiet}
                                onChange={(e) =>{setGlutenDiet(e.target.checked)}} />
                        </label>
                        <label>Lactose
                            <input 
                                type="checkbox"
                                checked={lactoseDiet}
                                onChange={(e) =>{setLactoseDiet(e.target.checked)}} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default AllergiesDietForm