import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './CommunityModal.css'
const SearchBar = () => {
    const [searchTerms, setSearchTerms] = useState('Find your friends here!')
    const dispatch = useDispatch()
    // const usersNames = useSelector(state => state)

    //testing variable
    const users = ['fuck ruby',
                 'fuck this shit', 
                 'fuckfuckityfuckfuck', 
                 'alice', 
                 'andrew', 
                 'amy', 
                 'Zach']
    let filteredUsers

    const filterUsers = (searchTerms) =>{
        const res = [];

        if(!searchTerms || searchTerms=== 'Find your friends here!')
            return res
        else{
            users.forEach(user=>{   
                if (user.toLowerCase().includes(searchTerms)){

                     res.push(user)           //change to user.name.lower() later
                }
            })
            return res
        }
    }

    useEffect(()=>{
        filteredUsers = filterUsers(searchTerms)
        console.log(filteredUsers)
        if(searchTerms === '') setSearchTerms('Find your friends here!')
    }, [searchTerms])

    return (
      <div>
            <input type='text' placeholder={searchTerms} onChange={e =>setSearchTerms(e.target.value)}/>
            <ul className='search-bar-results'>
                {filteredUsers?.map((user, idx) =>
                    //change this to user.name later
                    <li className='search-bar-result' key={idx}>{user}</li>
                )}

            </ul>


      </div>
    )
}

export default SearchBar
