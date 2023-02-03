import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./AllergiesDietForm.css"
import shellfish from "../../assets/survey_imgs/shellfish_cropped.jpg"
import fish from "../../assets/survey_imgs/fish_cropped.jpg"
import gluten from "../../assets/survey_imgs/gluten.jpg"
import lactose from "../../assets/survey_imgs/lactose.jpg"
import nuts from "../../assets/survey_imgs/nuts_cropped.jpg"
import vegan from "../../assets/survey_imgs/vegan.jpg"
import { fetchUser, updateUser } from "../../store/user";
import { useHistory } from "react-router-dom"
import UpdateAllergiesText from "./UpdateAllergiesText"
import Modal from 'react-modal';


const style={
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '1000',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '350px',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
},
}

function AllergiesDietForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((store) => store.session.user);

    const [fishAllergy, setFishAllergy] = useState(false);
    const [nutsAllergy, setNutsAllergy] = useState(false);
    const [shellfishAllergy, setShellfishAllergy] = useState(false);
    const [glutenDiet, setGlutenDiet]  = useState(false);
    const [lactoseDiet, setLactoseDiet]  = useState(false);
    const [veganDiet, setVeganDiet]  = useState(false);

    //start
    const [isOpen, setIsOpen] = useState(sessionUser.flavorProfile.length > 0);
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    //end

    useEffect(() => {
        if(sessionUser) {
            dispatch(fetchUser(sessionUser._id))
            if (sessionUser.allergies.length > 0 && sessionUser.diet.length > 0) {
                setFishAllergy(sessionUser.allergies[0])
                setNutsAllergy(sessionUser.allergies[1])
                setShellfishAllergy(sessionUser.allergies[2])
                setGlutenDiet(sessionUser.diet[0])
                setLactoseDiet(sessionUser.diet[1])
                setVeganDiet(sessionUser.diet[2])
            }
        }
    }, [dispatch])

    let updatedUser;
    if (sessionUser) {
        updatedUser = {...sessionUser,
                    ...{id: sessionUser._id,
                    allergies: [fishAllergy, nutsAllergy, shellfishAllergy],
                    diet: [glutenDiet, lactoseDiet, veganDiet]}
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(updatedUser));
        history.push('/dish_survey')
        window.location.reload(true)
    }

    return (
        // <div className="allergies-diet-form-parent">
            <div className="allergies-diet-form-container">
                {/* {sessionUser.flavorProfile.length > 0 && <UpdateAllergiesText/>} */}
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    shouldCloseOnOverlayClick={true}
                    style={style}
                    ariaHideApp={false}
                >
                    <UpdateAllergiesText/>
                </Modal>
                <form className="allergies-diet-form" onSubmit={handleSubmit}>
                    <div className="allergies-form">
                        <h1>Allergies</h1>
                        <div className="allergies-inputs">


                            <div className="survey-input">
                                <input
                                    type="checkbox" id='fish-checkbox'
                                    checked={fishAllergy}
                                    onChange={(e) =>{setFishAllergy(e.target.checked)}}/>
                                <label htmlFor='fish-checkbox'>
                                    <h3> Fish </h3>
                                    <img src={fish}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='nuts-checkbox'
                                    checked={nutsAllergy}
                                    onChange={(e) =>{setNutsAllergy(e.target.checked)}}/>
                                <label htmlFor='nuts-checkbox'>
                                    <h3> Nuts </h3>
                                    <img src={nuts}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='shellfish-checkbox'
                                    checked={shellfishAllergy}
                                    onChange={(e) =>{setShellfishAllergy(e.target.checked)}}/>
                                <label htmlFor='shellfish-checkbox'>
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
                                    type="checkbox" id='gluten-checkbox'
                                    checked={glutenDiet}
                                    onChange={(e) =>{setGlutenDiet(e.target.checked)}}/>
                                <label htmlFor='gluten-checkbox'>
                                    <h3> Gluten </h3>
                                    <img src={gluten}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='lactose-checkbox'
                                    checked={lactoseDiet}
                                    onChange={(e) =>{setLactoseDiet(e.target.checked)}}/>
                                <label htmlFor='lactose-checkbox'>
                                    <h3> Lactose </h3>
                                    <img src={lactose}/></label>
                            </div>
                            <div className="survey-input">
                                <input
                                    type="checkbox" id='vegan-checkbox'
                                    checked={veganDiet}
                                    onChange={(e) =>{setVeganDiet(e.target.checked)}}/>
                                <label htmlFor='vegan-checkbox'>
                                    <h3> Vegan </h3>
                                    <img src={vegan}/></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="survey-submit-button">Next</button>
                </form>
            </div>
        // </div>
    )

}

export default AllergiesDietForm
