import { useState } from 'react';

import { App as Canvas } from './Components/Canvas'
import { Overlay } from './Components/Overlay'

const Configurator = () => {
    const [isControl, setIsControl] = useState(false);
    return (
        <>
            <Canvas isControl={isControl} setIsControl={setIsControl}/>
            <Overlay isControl={isControl} setIsControl={setIsControl}/>
        </>
    )
}

export default Configurator;