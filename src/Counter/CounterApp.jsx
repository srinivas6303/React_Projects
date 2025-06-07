import React, { useState } from 'react'
import './CounterApp.css'

function CounterApp() {
    const[count,setCount]=useState(0);

    function increment(){
        setCount(count+1);
    }

    function decrement(){
        if(count>0){
        setCount(count-1);
        }
    }

    function reset(){
        setCount(0);
    }
  return (
    <div className="counterdiv">
        <h1>Counter App</h1>
        <h2>{count}</h2>
        <button className="ibtn" onClick={increment}>+</button>
        <button className="dbtn" onClick={decrement}>-</button>
        <button className="rbtn" onClick={reset}>Reset</button>
    </div>
  )
}

export default CounterApp