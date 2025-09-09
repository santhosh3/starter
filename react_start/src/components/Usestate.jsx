import React, { useState } from 'react'

function Usestate() {
    let [number, setNumber] = useState(0);

    function incrementNumber() {
        // setNumber(number+1)
        setNumber(prev => prev + 1)
    }

    function decrementNumber() {
        setNumber(prev => prev - 1)
    }

    return (
        <div className="container">
            <div className="content-container">
                <div className="content">{number}</div>
                <div className="button-container">
                    <button onClick={() => incrementNumber()}>
                        Increament Number
                    </button>
                    <button style={{backgroundColor : "red"}} onClick={() => decrementNumber()}>
                        Decrement Number
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Usestate