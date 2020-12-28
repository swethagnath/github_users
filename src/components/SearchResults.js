import React, {useH} from 'react';
import {useHistory} from 'react-router-dom'
import toast from './Popup'

const SearchResults = (users) =>{
    const {user} = users
    const history = useHistory()

    const addlocalStorage = () => {
        const addeduser = JSON.parse(localStorage.getItem("users"))
        addeduser.push(user)
        localStorage.setItem("users", JSON.stringify(addeduser))
        history.push(`/user/${user.login}`)
        toast("added successfully")
    }

    return(
        <div>
            {!!users.user &&  (
                <div>
                    <span><img style={{width: "150px", height: "150px"}} src={user.avatar_url} /></span>
                    <div style={{textDecoration: "underline", cursor: "pointer"}} onClick={addlocalStorage}>Add user</div>
                </div>
            )}
        </div>
    )

}

export default SearchResults