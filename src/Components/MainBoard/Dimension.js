import { useEffect, useState } from "react";
import { state } from "../../store";

const Dimension = () => {
    const changeDimension = (e) => {
        var changeValue = Number(e.target.value);
        state.currentDimension[`${e.target.id}`] = changeValue;
    }

    const handleFocus = () => {
        // state.disableControl = true;
    }

    const handleBlur = () => {
        // state.disableControl = false;
    }
    return (
        <div className="tapContainer">
            <div className="dimensionContainer" style={{marginRight: '30px'}}>
                <label className="dimensionLabel">{'Length(mm)'}</label>
                <input type="number" id="length" className="dimensionInput" defaultValue={state.currentDimension.length} onChange={changeDimension} onFocus={handleFocus} onBlur={handleBlur}/>
                <label className="dimensionLabel">{'Default : ' + `${state.initialDimension[state.currentStyleIndex].length} mm`}</label>
            </div>
            <div className="dimensionContainer" style={{marginRight: '30px'}}>
                <label className="dimensionLabel">{'Width(mm)'}</label>
                <input type="number" id="width" className="dimensionInput" defaultValue={state.currentDimension.width} onChange={changeDimension} onFocus={handleFocus} onBlur={handleBlur}/>
                <label className="dimensionLabel">{'Default : ' + `${state.initialDimension[state.currentStyleIndex].width} mm`}</label>
            </div>
            <div className="dimensionContainer">
                <label className="dimensionLabel">{'Height(mm)'}</label>
                <input type="number" id="height" className="dimensionInput" defaultValue={state.currentDimension.height} onChange={changeDimension} onFocus={handleFocus} onBlur={handleBlur}/>
                <label className="dimensionLabel">{'Default : ' + `${state.initialDimension[state.currentStyleIndex].height} mm`}</label>
            </div>
        </div>
    )
}

export default Dimension;