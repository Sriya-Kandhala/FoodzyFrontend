import React, { useEffect, useState } from 'react'

function Timer() {

    let[time,setTime] = useState(0);
useEffect(()=>{
    let TimerId = setInterval(()=>{
                                console.log("Timer is running");
                                setTime(time=> time +1)
                                  },1000);
        return ()=>{clearInterval(TimerId)};
                
            })
  return (
    <>
      <h1>Time: {time}</h1>
    </>
  )
}

export default Timer
