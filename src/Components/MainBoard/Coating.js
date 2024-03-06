import { state } from "../../store";

const Coating = () => {
    const labelName = ['None', 'Gloss', 'Silk', 'Matt', 'Other'];
    const toolTip = [
        'No coating will be added to the printed surface. This option is best used for uncoated material options to keep the textured appearance.',
        'All over gkiss coating gives your packaging a shiny finish. This is often used to enhance packaging with vibrant colours or images.',
        'All over Silk coating provides a neutral finish between gloss and matt. Commonly used to provide the protection to the print from the coating with a neutral finish.',
        'All over Matt coating can provide a strong contrast to some of the finishing options. Matt coatings are not required on uncoated materials.',
        'If you cannot see the option you would like, please choose this option and add your comments at the end of the form.'
    ]

    const coatingBtnClick = (index) => {
        state.currentCoating = index;
    }

    return (
        <div className="tapContainer">
        {state.initialCoating.map((coating, index) => {
            return  <button className="materialChip" onClick={() => coatingBtnClick(index)} key={coating}>
                        <div className="materialContent">
                            <img src={"/texture/Coating/" + coating + '.png'} className="materialIcon"/>
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

export default Coating;