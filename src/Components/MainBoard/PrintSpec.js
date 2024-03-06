import { state } from "../../store";

const PrintSpec = () => {
    const labelName = ['None', 'Black Only', 'CMYK', 'CMYK + 1 Pantone(Std)', 'CMYK + 2 Pantone(Std)', 'CMYK + 1 Pantone(Metallic/Fluorescent)', 'CMYK + 2 Pantone(Metallic/Fluorescent)', '1 Pantone(Std)', '2 Pantone(Std)', '1 Pantone(Metallic/Fluorescent)', '2 Pantone(Metallic/Fluorescent)', 'Other']
    const toolTip = [
        'If you do not require any print on your packaging, please select this option.',
        'Printing black ink only.',
        'Cyan, Magenta, Yellow and Key (Black). This standard ink set can achieve the vast majority of colurs. Ideal for artwork with images or a large range of colours.',
        'Full colour (CMYK) with the addition of 1 pantone colour from standard pantone range. Pantone inks can be used for large solid areas or brand colours.',
        'Full colour (CMYK) with the addition of 2 pantone colour from standard pantone range. Pantone inks can be used for large solid areas or brand colours.',
        'Full colour (CMYK) with the addition of 1 special pantone colour such as Metallics, pastel or fluorescents. Pantone inks can be used for alrge solid areas, brand colours or special effects.',
        'Full colour (CMYK) with the addition of 2 special pantone colour such as Metallics, pastel or fluorescents. Pantone inks can be used for alrge solid areas, brand colours or special effects.',
        'Printed using 1 pantone colour from the standard pantone range. Pantone inks can be used for large solid areas or brand colours.',
        'Printed using 2 pantone colour from the standard pantone range. Pantone inks can be used for large solid areas or brand colours.',
        'Printed using 1 special pantone colour such as Metallics, pastel or fluorescents. Pantone inks can be used for large solid areas, brand colours or special effects.',
        'Printed using 2 special pantone colour such as Metallics, pastel or fluorescents. Pantone inks can be used for large solid areas, brand colours or special effects.',
        'If you cannot see the option you would like, please choose this option and add your notes at the end of the form.'
    ]

    const printSpecBtnClick = (index) => {
        state.currentPrintSpec = index;
    }

    return (
        <div className="tapContainer">
        {state.initialPrintSpec.map((printSepc, index) => {
            return  <button className="printSpecChip" onClick={() => printSpecBtnClick(index)} key={printSepc}>
                        <div className="printSpecContent">
                            <img src={"/texture/PrintSpec/Thumb/" + printSepc + '.png'} className="printSpecIcon"/>
                            <label className="printSpecLabel">
                                {/* <span style={{maxWidth: '50px'}}>{labelName[index]}</span> */}
                                {(index !== 4) && <span className="tooltiptext">{toolTip[index]}</span>}
                            </label>
                        </div>
                    </button>
        })}
        </div>
    )
}

export default PrintSpec;