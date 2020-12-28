import React, {useState, useEffect} from 'react';
import SearchResults from './SearchResults';
import {Link} from 'react-router-dom';
import toast from './Popup'


const Search = () => {

    const [searchText, setSearchText] = useState("")
    const [users, setUsers]           = useState("") 
    const [addusers, setAddUsers]     = useState([])
    const [loading, setLoading]       = useState(false)
    const [error, setError]           = useState("")

    useEffect(() => {
        let timer1 = setTimeout(() => fetchUsers(), 1000)
        return () => {
            clearTimeout(timer1)
        }
    }, [searchText])

    useEffect(() => {
        const addusers = JSON.parse(localStorage.getItem("users"))
        setAddUsers(addusers)
    }, [])

    const removeUser = (user) => {
        const users = addusers.filter(olduser => olduser.login != user.login)
        setAddUsers(users)
        localStorage.setItem("users", JSON.stringify(users))
        toast("deleted successfully")
    }

    const fetchUsers = () => {
        if(searchText){
            setError("")
            setLoading(true)
            fetch(`https://api.github.com/users/${searchText}`)
            .then(res => res.json())
            .then(res => {
                if(res.message){
                    setError("not found")
                }else{
                    setUsers(res)
                }
                setLoading(false)
            })
            .catch((err) => {
                setError("not found")
            })
        }
    }
    
    return(
        <div style={{marginTop: "40px"}} className="container">
            <h4>Search Github Users</h4>
            <input style={{marginBottom: "30px"}}type="text" placeholder="Please Enter Original Username" onChange={e => {setSearchText(e.target.value)}} /> 
            {loading ? <p>loading.....</p> : <SearchResults user={users} />}
            <p>{(error) && error}</p>
            {addusers && addusers.length > 0 ? (
                <div>
                    <h3>Added users</h3>
                    <ul className="collection">
                        {addusers.map(user => {
                            return <li key={user.login} className="collection-item">
                                <Link to={`/user/${user.login}`}>{user.login}</Link>
                                <span onClick={() => {removeUser(user)}} style={{textDecoration: "underline", cursor: "pointer", marginLeft: "20px"}}>Remove User</span>
                            </li>
                        })}
                    </ul>
                </div>
            ) : "no users added yet"}
        </div>
    )

}

export default Search