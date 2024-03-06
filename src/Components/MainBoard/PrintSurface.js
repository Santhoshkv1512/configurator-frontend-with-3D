import { useSnapshot } from "valtio";
import { state } from "../../store";

const PrintSurface = () => {
    const snap = useSnapshot(state);
    const labelName = ['Outside', 'OutSide + Inside'];
    const toolTip = [
        'Priting will be to one side of the sheets used in the packaging. Some packaging styles may still show print on the inside where flaps flod inside.',
        'Printing will be to both side of the sheets used in the packaging. This allows for print fo show throughout the inside and outside of the packaging.',
    ]

    const printSurfaceBtnClick = (index) => {
        state.currentPrintSurface = index;
    }

    return (
        <div className="tapContainer">
        {state.initialPrintSurface.map((printSurface, index) => {
            return  <button className="materialChip" onClick={() => printSurfaceBtnClick(index)} key={printSurface}>
                        <div className="materialContent">
                            <img src={"/texture/PrintSurface/" + printSurface + '.png'} className="materialIcon"/>
                            <label className="materialLabel">
                                <span style={{maxWidth: '50px'}}>{labelName[index]}</span>
                                {(index !== 4) && <span className="tooltiptext">{toolTip[index]}</span>}
                            </label>
                        </div>
                    </button>
        })}
        </div>
    )
}

export default PrintSurface;