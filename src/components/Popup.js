import React from 'react';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const popup = (err) => {
    toast.configure()  
    toast.error(err,  {position: toast.POSITION.TOP_CENTER})
}

export default popup