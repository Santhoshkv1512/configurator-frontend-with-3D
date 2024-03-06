import { useEffect, useState } from "react";
import { state } from "../../store";

const Quantity = () => {
    const [quantity, setQuantity] = useState(0);
    const clickQuantityBtn = () => {
        console.log(quantity);
        if (quantity !==0 ) alert('Purchased ' + quantity + ' ' + state.style[state.currentStyleIndex] + '.')
    }

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleFocus = () => {
        state.disableControl = true;
    }

    const handleBlur = () => {
        state.disableControl = false;
    }
    return (
        <div className="tapContainer">
            <div className="dimensionContainer" style={{marginRight: '30px'}}>
                <label className="dimensionLabel">{'Quantity'}</label>
                <input type="number" id="length" className="dimensionInput" onFocus={handleFocus} onBlur={handleBlur} onChange={changeQuantity}/>
            </div>
            <button onClick={clickQuantityBtn} style={{height: '60px', marginTop: '20px', backgroundColor: '#35b3a8', color: "white", borderRadius: '30px', border: 'none'}}>SUBMIT BRIEF</button>
        </div>
    )
}

export default Quantity;