import { state } from "../../store";

const Finishing = () => {
    const labelName = ['None', 'Spot Gloss UV', 'Metallic Foiling', 'Emboss / Deboss', 'Others'];
    const toolTip = [
        'No Finish option be aded to the material.',
        'Gloss is applied to specific areas of the artwork to create a contrast that stands out. Drawing attention to a specific area or feature.Gloss is applied to specific areas of the artwork to create a contrast that stands out. Drawing attention to a specific area or feature.',
        'Hot foil stamping provides a luxuary finish which can be combined with embossing to enhance. There is a range of foils available in terms of colour and patterns.',
        'Embossing or debossing can be used to provide a tactile element to the packaging. Embossing can be combined with the other finishes.',
        'If you cannot see the option you would like, please choose this option and add your notes at the end of the form.'
    ]

    const finishingBtnClick = (index) => {
        state.currentFinishingArray[index] = !state.currentFinishingArray[index];
    }

    return (
        <div className="tapContainer">
        {state.initialFinishing.map((finishing, index) => {
            return  <button className="materialChip" onClick={() => finishingBtnClick(index)} key={finishing}>
                        <div className="materialContent">
                            <img src={"/texture/Finish/thumb/" + finishing + '.png'} className="materialIcon"/>
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

export default Finishing;