import React, {useH} from 'react';
import {Link, useHistory} from 'react-router-dom'
import toast from './Popup'

const SearchResults = (users) =>{
    const user = users.user
    const history = useHistory()

    const addlocalStorage = () => {
        const addeduser = JSON.parse(localStorage.getItem("users"))
        addeduser.push(user)
        localStorage.setItem("users", JSON.stringify(addeduser))
        history.push(`/user/${user.login}`)
        toast("added successfully")
    }

    // const removeUser = () => {
        
    // }

    return(
        <div>
            {!!users.user &&  (
                <div>
                    <span><img style={{width: "150px", height: "150px"}} src={user.avatar_url} /></span>
                    <div style={{textDecoration: "underline", cursor: "pointer"}} onClick={addlocalStorage}>Add user</div>
                    {/* <div onClick={removeUser} style={{textDecoration: "underline", cursor: "pointer"}}>Remove User</div> */}
                </div>
            )}
        </div>
    )

}

export default SearchResults