import React, {useState, useEffect} from 'react';
import SearchResults from './SearchResults';
import {Link} from 'react-router-dom';


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
            <input style={{marginBottom: "30px"}}type="text" placeholder="please enter username" onChange={e => {setSearchText(e.target.value)}} /> 
            {loading ? <p>loading.....</p> : <SearchResults user={users} />}
            <p>{(error) && error}</p>
            {addusers && addusers.length > 0 ? (
                <div>
                    <h3>Added users</h3>
                    <ul class="collection">
                        {addusers.map(user => {
                            return <li className="collection-item"><Link to={`/user/${user.login}`}>{user.login}</Link></li>
                        })}
                    </ul>
                </div>
            ) : "no users added yet"}
        </div>
    )

}

export default Search