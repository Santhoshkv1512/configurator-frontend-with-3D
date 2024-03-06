import { state } from "../../store";

const Material = () => {
    const labelName = ['Coated White Board', 'Uncoated White Board', 'Kraft Brown Board', 'Microflute Kraft', 'Microflute White', 'Other']
    const toolTip = [
        'Premium folding boxboard material - incredibly versatile and used for a vast range of packaging styles. The smooth coated surface on the outside enables vibrant colour print.',
        'Uncoated white board is generally the reverse side of a coated board. It is often picked for its more natural/organic feel and texture with a soft matt finish.',
        'An uncoated, naturally brown board made with long virgin fibres for added strength. Often picked for its natural look and textured feel.Tuck end cartons are simple to pack with tuck flaps on each end. They are very efficient on material use so can provide a cost effective solution.',
        'A stronger, uncoated, naturally brown board with a microflute. Often used for products that require more protection and a stronger structure whilst retaining a more natural look.',
        'A stronger, white board with a microfulte. Commonly used for items requiring extra protection and larger boxes that require more structure where colour vibrancy is essential.',
        'There is a wide range of materials so if you cannot see the option you would like, please choose this option and add your notes at the end of the form.'
    ]

    const materialBtnClick = (index) => {
        state.currentMaterialIndex = index;
    }
    return (
        <div className="tapContainer">
        {state.initialMaterial.map((material, index) => {
            return index !== 6 && <button className="materialChip" onClick={() => materialBtnClick(index)} key={material}>
                        <div className="materialContent">
                            <img src={"/texture/material/" + material + '.png'} className="materialIcon" width={'120px'} height={'120px'}/>
                            <label className="materialLabel">
                                {labelName[index]}
                                <span className="tooltiptext">{toolTip[index]}</span>
                            </label>
                        </div>
                   </button>
        })}
        </div>
    )
}

export default Material;