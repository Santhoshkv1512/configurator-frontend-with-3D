import { state } from "../../store";

const Style = () => {
    const labelName = ['Mailer', 'Sleeve', 'Tuck End', 'Lid & Base', 'Buffer Wall Tray & hinged Lid', 'Crash Lock Base', 'Skillet', 'Self Locking Tray', 'Hanging Card', 'Others']
    const toolTip = [
        'Mailer boxes are often designed to send your products but they are very versatile. Mailers are easy to assemble and their double side walls make them durable.',
        'Sleeves slide over your packaging, allowing the underlying product to be seen. Also can be used to great way to add a promotion to an existing box.',
        'Tuck end cartons are simple to pack with tuck flaps on each end. They are very efficient on material use so can provide a cost effective solution.',
        'Used for more premium options, base and lid boxes offer the perfect presentation style packaging solution. Can have full height or partical height lids.',
        '',
        'Crash lock base cartons are glued for quick assembly with a tuck flap closure at the top. The glued base also provides added strength for heavier items.',
        'Skillet cartons are often used for high volume runs of packaging(packaged in line mechanically). They are sealed shut, top and bottom, with glue.',
        'Self locking trays are idea for retail displays or where a product does not require a lid.',
        'Hanging Cards are an effective form of packaging for maximizing the display of a product and hanging in a retail environment. They can be used to provide instructions on use, branding and product information. Typically used for textiles, jewelry, tools and gift cards etc.',
        'We can create bespoke designs so if you cannot see the option you would like, please choose this option and add your notes at the end of the form.'
    ]

    const styleBtnClick = (index) => {
        state.currentStyleIndex = index;
    }
    return (
        <div className="tapContainer">
        {state.style.map((style, index) => {
            return <button className="styleChip" onClick={() => styleBtnClick(index)} key={style}>
                        <div className="styleContent">
                            <img src={"/texture/style/" + style + '.png'}/>
                            <label className="styleLabel">
                                {labelName[index]}
                                {(index !== 4) && <span className="tooltiptext">{toolTip[index]}</span>}
                            </label>
                        </div>
                   </button>
        })}
        </div>
    )
}

export default Style;