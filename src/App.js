import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import Search from './components/SearchBox'
import { useEffect } from 'react';
import UserView from './components/UserView'

function App() {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"))
    if(!user){
      localStorage.setItem("users", JSON.stringify([]))
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Search/>
        </Route>
        <Route exact path="/user/:id" component={UserView} />
      </BrowserRouter>
    </div>
  );

}

export default App;
