export const normalizeGroupFlavorProfile = (flavorProfiles) =>{
    const averages = [0, 0, 0 ,0 ,0]
    let error = 0;
    for(const profile of flavorProfiles){
        if(profile.length === 0) {
            error ++ 
            continue
        }
        averages[0] += profile[0]
        averages[1] += profile[1]
        averages[2] += profile[2]
        averages[3] += profile[3]
        averages[4] += profile[4]
    }

    let sqrdAvgs = [...averages]
    sqrdAvgs.map((i) =>( (i/flavorProfiles.length - error)**2 ))
    let sumSquares = 0
    for(let i of sqrdAvgs)sumSquares += i
    averages.map((i)=>(i/Math.sqrt(sumSquares)))

    return averages
}

export const normalizeGroupGenreProfile = (genreProfiles) => {
    const averages = [0, 0, 0 ,0]
    let error = 0;
    for(const profile of genreProfiles){
        if(profile.length === 0) {
            error ++ 
            continue
        }
        averages[0] += profile[0]
        averages[1] += profile[1]
        averages[2] += profile[2]
        averages[3] += profile[3]
    }


    let sqrdAvgs = [...averages]
    sqrdAvgs.map((i) =>( (i/genreProfiles.length - error)**2 ))
    let sumSquares = 0
    for(let i of sqrdAvgs)sumSquares += i
    averages.map((i)=>(i/Math.sqrt(sumSquares)))

    return averages
}

export const normalizeGroupAllergiesProfile = (allergyProfiles) =>{

    const avgAllergies = [true, true, true]
    for(const allergy of allergyProfiles){
        if(allergy.length === 0) continue
        avgAllergies[0] = avgAllergies[0] && allergy[0]
        avgAllergies[1] = avgAllergies[1] && allergy[1]
        avgAllergies[2] = avgAllergies[2] && allergy[2]

    }
    return avgAllergies
}

export const normalizeGroupDietProfile = (dietProfiles) =>{
    const avgDietProfile = [true, true, true]
    for(const diet of dietProfiles){
        if(diet.length ===0) continue
        avgDietProfile[0] = avgDietProfile[0] && diet[0]
        avgDietProfile[1] = avgDietProfile[1] && diet[1]
        avgDietProfile[2] = avgDietProfile[2] && diet[2]

    }
    return avgDietProfile;
}
