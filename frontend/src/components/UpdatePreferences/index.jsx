import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



const UpdatePreferences = () => {
  const dispatch = useDispatch()

  const handleStartOver = e =>{
    e.preventDefault();
    
    

  }

  useEffect(()=>{
    
  },[dispatch])
  

  return (
    <div className='udc'>

      <div>
      
      </div> 

      <div>

        <h2>Not finding the right dishes for you?</h2>
        <p>We understand if you feel that something just isn't working out right, but we hope you'll still keep having adventures with us. Click the button below to start the profiling process over.</p>

        <button onClick={handleStartOver}>
          Start Over
        </button>

      </div>

    </div>
  )
}

export default UpdatePreferences