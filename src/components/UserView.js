import React, {useState, useEffect} from 'react';

const UserView = props => {
    const [user, setUser] = useState("")

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users"))
        const user  = users.filter(user => user.login == props.match.params.id)
        setUser(user[0])
    }, [])

    

    return(
        <div style={{marginTop: "40px"}} className="container">
           {user && (
               <div>
                    <div>
                        <img style={{width:"300px", height: "300px"}} src={user.avatar_url} />
                    </div>
                   
                   <p>
                       name:{user.login}
                    </p>
                    
                       {(!!user.bio) && (<p>bio:{user.bio}</p>)}
                    
                    <p>
                       followers: {user.followers}
                    </p>

                    <p>
                        following: {user.following}
                    </p>
               </div>
            )}
        </div>
    )
}

export default UserView                                                          