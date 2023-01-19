import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './CommunityModal.css'

const SearchBar = ({groupList, setGroupList}) => {
    const [searchTerms, setSearchTerms] = useState('Find your friends here!')
    const [filteredUsers, setFilteredUsers] = useState([])
    const dispatch = useDispatch()
    // const usersNames = useSelector(state => state)

    //testing variables, delete upon production
    const users = ['fuck ruby',
                 'fuck this shit', 
                 'fuckfuckityfuckfuck', 
                 'alice', 
                 'andrew', 
                 'amy', 
                 'Zach']

    const filterUsers = (searchTerms) =>{
        const res = [];

        if(!searchTerms || searchTerms=== 'Find your friends here!')
            return res
        else{
            users.forEach(user=>{   
                if (user.toLowerCase().includes(searchTerms)) res.push(user)           //change to user.name.lower() later
            })
            return res
        }
    }


    const handleOnClick = e =>{
        e.preventDefault();
        e.stopPropogation();
        
    }

    useEffect(()=>{
        setFilteredUsers(filterUsers(searchTerms))
        if(searchTerms === '') setSearchTerms('Find your friends here!')
    }, [searchTerms])

    return (
      <div className="searchbar-container">
            <input type='text' placeholder={searchTerms} onChange={e =>setSearchTerms(e.target.value)}/>
            <div className="modal-searchsuggestions-container">
            {filteredUsers?.map((user, idx) =>
                    //change this to user.name later
            <div className='search-bar-result' key={idx} onClick={handleOnClick}>{user}</div>
        )}
    </div>
      </div>
    )
}

export default SearchBar
