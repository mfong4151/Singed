import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./AllergiesDietForm.css"
import shellfish from "../../assets/survey_imgs/shellfish_cropped.jpg"
import fish from "../../assets/survey_imgs/fish_cropped.jpg"
import gluten from "../../assets/survey_imgs/gluten.jpg"
import lactose from "../../assets/survey_imgs/lactose.jpg"
import nuts from "../../assets/survey_imgs/nuts_cropped.jpg"
import vegan from "../../assets/survey_imgs/vegan.jpg"


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
        // <div className="allergies-diet-form-parent">
            <div className="allergies-diet-form-container">
                <form className="allergies-diet-form" onSubmit={handleSubmit}>
                    <div className="allergies-form">
                        <h1>Allergies</h1>
                        <div className="allergies-inputs">
                            
                            
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='fish-checkbox'
                                    checked={fishAllergy}
                                    onChange={(e) =>{setFishAllergy(e.target.checked)}}/>
                                <label for='fish-checkbox'>
                                    <h3> Fish </h3>
                                    <img src={fish}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='nuts-checkbox'
                                    checked={nutsAllergy}
                                    onChange={(e) =>{setNutsAllergy(e.target.checked)}}/>
                                <label for='nuts-checkbox'>
                                    <h3> Nuts </h3>
                                    <img src={nuts}/></label>                                
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='shellfish-checkbox'
                                    checked={shellfishAllergy}
                                    onChange={(e) =>{setShellfishAllergy(e.target.checked)}}/>
                                <label for='shellfish-checkbox'>
                                    <h3> ShellFish </h3>
                                    <img src={shellfish}/></label>
                            </div>
                        </div>
                    </div>
                    <div className="diet-form">
                        <h1>Dietary Restrictions</h1>
                        <div className="dietary-inputs">
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='vegan-checkbox'
                                    checked={veganDiet}
                                    onChange={(e) =>{setVeganDiet(e.target.checked)}}/>
                                <label for='vegan-checkbox'>
                                    <h3> Vegan </h3>
                                    <img src={vegan}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='gluten-checkbox'
                                    checked={glutenDiet}
                                    onChange={(e) =>{setGlutenDiet(e.target.checked)}}/>
                                <label for='gluten-checkbox'>
                                    <h3> Gluten </h3>
                                    <img src={gluten}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='lactose-checkbox'
                                    checked={lactoseDiet}
                                    onChange={(e) =>{setLactoseDiet(e.target.checked)}}/>
                                <label for='lactose-checkbox'>
                                    <h3> Lactose </h3>
                                    <img src={lactose}/></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Next</button>
                </form>
            </div>
        // </div>
    )

}

export default AllergiesDietForm