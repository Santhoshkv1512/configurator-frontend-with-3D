import * as THREE from 'three';
import { useSnapshot } from "valtio"
import { state } from "../store"
import { useEffect, useRef, useState } from "react";
import { useTexture, Decal } from "@react-three/drei";

let currentMaterial;
let currentPrintSpecMaterial;

const BasicMaterial = ({snap, materials, isControl, coating}) => {

    let material;
    if (isControl) {
        if (snap.currentMaterialIndex !== 5) material = useTexture('/texture/material/' + snap.initialMaterial[snap.currentMaterialIndex] + '.png');
    } else {
        material = useTexture('/texture/material/' + snap.initialMaterial[6] + '.png');
    }
    
    if (material && materials) {
        materials.Material_0.map = material;
        materials.Material_1.map = material;
        materials.Material_2.map = material;
        currentMaterial = material;
    }

    let bumpValues = [0.0005, 0.0001, 0.0002, 0.0005, 0.0005, 0.0005];
    
    return <meshStandardMaterial attach={'material'} color={materials.Material_2.color} map={materials.Material_2.map} roughness={coating === 0?1:coating} metalness={0} bumpMap={material} bumpScale={bumpValues[snap.currentCoating]}/>
}

const EmbossingMaterial = ({snap, materials, isControl, coating}) => {
    let material;
    if (isControl) {
        if (snap.currentMaterialIndex !== 5) material = useTexture('/texture/material/' + snap.initialMaterial[snap.currentMaterialIndex] + '.png');
    } else {
        material = useTexture('/texture/material/' + snap.initialMaterial[6] + '.png');
    }
    
    if (material && materials) {
        materials.Material_0.map = material;
        materials.Material_1.map = material;
        materials.Material_2.map = material;
        currentMaterial = material;
    }

    let emboss = useTexture('/texture/Finish/texture/emboss.png');
    let bumpValues = [0.0005, 0.0001, 0.0002, 0.0005, 0.0005, 0.0005];
    return <meshStandardMaterial attach={'material'} color={materials.Material_2.color} map={materials.Material_2.map} roughness={coating === 0?1:coating} metalness={0} normalMap={emboss} normalScale={[1.5, 1.5]} bumpMap={material} bumpScale={bumpValues[snap.currentCoating]}/>
}

const PrintSpecMaterial = ({snap, coating}) => {
    
    let printSpec = [];
    if (snap.currentPrintSpec !== 0) {
        for (let index = 1; index <= 9; index++) {
            printSpec[index-1] = useTexture('/texture/PrintSpec/texture/' + snap.initialPrintSpec[snap.currentPrintSpec] + '/' + index + '.png');
        }
    }
    let doubleSide = snap.currentPrintSurface;

    currentPrintSpecMaterial = printSpec;

    let bumpValues = [0.0005, 0.0001, 0.0002, 0.0005, 0.0005, 0.0005];
    let props = {roughnessMap: currentMaterial, roughness: coating === 0?1:coating, metalness: 0, bumpMap: currentMaterial, bumpScale: bumpValues[snap.currentCoating]};

    return printSpec.length !== 0 && <>
        <Decal position={doubleSide?[0, 0, -0.05]:[0, 0.0011, -0.0993]} rotation={0} scale={[0.179, 0.06, 0.02]} map={doubleSide?printSpec[2]:printSpec[0]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        <Decal position={doubleSide?[0.0995, 0, 0.0493]:[0.0993, 0.0018, 0]} rotation={[0, Math.PI / 2, 0]} scale={doubleSide?[0.181, 0.06, 0.02]:[0.184, 0.06, 0.02]} map={printSpec[1]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        <Decal position={doubleSide?[0, 0, 0.149]:[0, 0.0011, 0.1013]} rotation={0} scale={[0.18, 0.06, 0.02]} map={printSpec[2]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        <Decal position={doubleSide?[-0.0993, 0, 0.0493]:[-0.0993, 0.0018, 0]} rotation={[0, Math.PI * 3 / 2, 0]} scale={doubleSide?[0.181, 0.06, 0.02]:[0.184, 0.06, 0.02]} map={printSpec[3]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        <Decal position={doubleSide?[0, 0, 0.0493]:[0, -0.078, 0.001]} rotation={[Math.PI * 3/ 2, 0, 0]} scale={doubleSide?[0.1793, 0.1793, 0.1]:[0.175, 0.175, 0.1]} map={printSpec[5]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        <Decal position={doubleSide?[0, 0.121, -0.065]:[0, 0.031, 0.0005]} rotation={doubleSide?[Math.PI * 11/ 6, 0, 0]:[Math.PI * 3/ 2 , 0, 0]} scale={[0.1753, 0.181, 0.1]} map={printSpec[4]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1}/>
        {
            snap.currentFinishing !== 2 && 
            <Decal position={doubleSide?[0, 0.121, -0.065]:[0, 0.031, 0.005]} rotation={doubleSide?[Math.PI * 11/ 6, Math.PI, 0]:[Math.PI * 3/ 2 , 0, 0]} scale={[0.0487, 0.02625, 0.11]} map={printSpec[6]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-3}/>
        }
        <Decal position={[0, 0.218, -0.14]} rotation={[Math.PI * 35/ 18, Math.PI, 0]} scale={[0.179, 0.06, 0.02]} map={printSpec[0]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1} visible={snap.currentPrintSurface}/>
        <Decal position={[-0.108, 0.224, -0.111]} rotation={[Math.PI * 35/ 18, Math.PI * 2 / 9, 0]} scale={[0.06, 0.06, 0.02]} map={printSpec[8]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1} visible={snap.currentPrintSurface}/>
        <Decal position={[0.108, 0.224, -0.11]} rotation={[Math.PI * 35/ 18, -Math.PI * 2 / 9, 0]} scale={[0.06, 0.06, 0.02]} map={printSpec[8]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1} visible={snap.currentPrintSurface}/>
        <Decal position={[0.112, 0.12, -0.07]} rotation={[Math.PI * 11/ 6, -Math.PI * 2 / 9, -Math.PI / 300]} scale={[0.06, 0.179, 0.02]} map={printSpec[7]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1} visible={snap.currentPrintSurface}/>
        <Decal position={[-0.112, 0.12, -0.07]} rotation={[Math.PI * 11/ 6, Math.PI * 2 / 9, Math.PI / 300]} scale={[0.06, 0.179, 0.02]} map={printSpec[7]} map-anisotropy={16} {...props} polygonOffset polygonOffsetFactor={-1} visible={snap.currentPrintSurface}/>
    </>
}

const PrintSurfaceMaterial = ({snap, coating}) => {
    let bumpValues = [0.0005, 0.0001, 0.0002, 0.0005, 0.0005, 0.0005];
    let props = {roughnessMap: currentMaterial, roughness: coating === 0?1:coating, metalness: 0, polygonOffset: true, polygonOffsetFactor: -1, bumpMap: currentMaterial, bumpScale: bumpValues[snap.currentCoating]};
    return (currentPrintSpecMaterial.length !== 0) && (snap.currentPrintSurface !== 0) && currentPrintSpecMaterial[7] && currentPrintSpecMaterial[8] && <>
        <Decal position={[0, 0, -0.05]} rotation={0} scale={[0.179, 0.06, 0.02]} map={currentPrintSpecMaterial[2]} map-anisotropy={16} {...props} polygonOffsetFactor={-2}/>
        <Decal position={[0, 0, 0.148]} rotation={0} scale={[0.18, 0.06, 0.02]} map={currentPrintSpecMaterial[2]} map-anisotropy={16} {...props} polygonOffsetFactor={-2}/>
        <Decal position={[0, -0.031, 0.0493]} rotation={[Math.PI * 3/ 2, 0, 0]} scale={[0.184, 0.184, 0.1]} map={currentPrintSpecMaterial[5]} map-anisotropy={16} {...props}/>
        <Decal position={[-0.0005, 0.121, -0.065]} rotation={[Math.PI * 11/ 6, 0, Math.PI]} scale={[0.1753, 0.181, 0.1]} map={currentPrintSpecMaterial[4]} map-anisotropy={16} {...props}/>
        <Decal position={[0, 0.121, -0.065]} rotation={[Math.PI * 11/ 6, 0, Math.PI]} scale={[0.0487, 0.02625, 0.11]} map={currentPrintSpecMaterial[6]} map-anisotropy={16} {...props} polygonOffsetFactor={-2}/>
        <Decal position={[0, 0.218, -0.14]} rotation={[Math.PI * 35/ 18, 0, 0]} scale={[0.179, 0.06, 0.02]} map={currentPrintSpecMaterial[0]} map-anisotropy={16} {...props}/>
        <Decal position={[-0.108, 0.224, -0.11]} rotation={[Math.PI * 35/ 18, Math.PI * 2 / 9, 0]} scale={[0.06, 0.06, 0.02]} map={currentPrintSpecMaterial[8]} map-anisotropy={16} {...props}/>
        <Decal position={[0.108, 0.224, -0.11]} rotation={[Math.PI * 35/ 18, -Math.PI * 2 / 9, 0]} scale={[0.06, 0.06, 0.02]} map={currentPrintSpecMaterial[8]} map-anisotropy={16} {...props}/>
        <Decal position={[0.112, 0.12, -0.07]} rotation={[Math.PI * 11/ 6, -Math.PI * 2 / 9, -Math.PI / 300]} scale={[0.06, 0.179, 0.02]} map={currentPrintSpecMaterial[7]} map-anisotropy={16} {...props}/>
        <Decal position={[-0.113, 0.12, -0.07]} rotation={[Math.PI * 11/ 6, Math.PI * 2 / 9, Math.PI / 300]} scale={[0.06, 0.179, 0.02]} map={currentPrintSpecMaterial[7]} map-anisotropy={16} {...props}/>
    </>
}

const FinishingMaterial = ({snap}) => {
    // Finishing
    let glossUV = useTexture('/texture/Finish/texture/glossUV.png');
    let goldenFoil = useTexture('/texture/Finish/texture/goldenfoil.png');

    let doubleSide = snap.currentPrintSurface;
    let bumpValues = [0.0005, 0.0001, 0.0002, 0.0005, 0.0005, 0.0005];
    return <>
        { snap.currentFinishingArray[1] && 
            <Decal position={doubleSide?[0, 0.121, -0.065]:[0, 0.031, 0.001]} rotation={doubleSide?[Math.PI * 11/ 6, Math.PI, 0]:[Math.PI / 2, Math.PI, 0]} scale={doubleSide?[0.175, 0.06, 0.11]:[0.175, 0.06, 0.11]} map={glossUV} map-anisotropy={16}  roughness={0} polygonOffset polygonOffsetFactor={-2} opacity={0.1} metalness={1}/>
        }
        { snap.currentFinishingArray[2] &&
            <Decal position={doubleSide?[0, 0.121, -0.065]:[0, 0.031, 0.005]} rotation={doubleSide?[Math.PI * 11/ 6, Math.PI, 0]:[Math.PI * 3/ 2 , 0, 0]} scale={[0.0487, 0.02625, 0.11]} map={goldenFoil} map-anisotropy={16} roughnessMap={currentMaterial} roughness={0}  metalness={1} polygonOffset polygonOffsetFactor={-3} bumpMap={currentMaterial} bumpScale={bumpValues[snap.currentCoating]}/>
        }
    </>
}

const Model = ({nodes, materials, isControl}) => {
    const [initialDimension, setInitialDimension] = useState(state.initialDimension[state.currentStyleIndex]);
    const snap = useSnapshot(state);

    // Dimension
    const initialScaleValue = 1;
    let xScale = initialScaleValue * snap.currentDimension['length'] / initialDimension['length'];
    let yScale = initialScaleValue * snap.currentDimension['height'] / initialDimension['height'];
    let zScale = initialScaleValue * snap.currentDimension['width'] / initialDimension['width'];

    // Coating
    let coatingValues = [1, 0.01, 0.3, 0.9, 1];
    let coatingValue = coatingValues[snap.currentCoating];

    return  <>
        <mesh castShadow geometry={nodes.Mesh_0.geometry} scale={[xScale, yScale, zScale]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}> 
            {   
                snap.currentFinishingArray[3]?<EmbossingMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />:
                <BasicMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />
            }
        </mesh>
        <mesh castShadow geometry={nodes.Mesh_0_1.geometry}  scale={[xScale, yScale, zScale]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}> 
            {   
                snap.currentFinishingArray[3]?<EmbossingMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />:
                <BasicMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />
            }
            <PrintSpecMaterial snap={snap} coating={coatingValue} />
            <FinishingMaterial snap={snap} />
        </mesh>
        <mesh castShadow geometry={nodes.Mesh_0_2.geometry} scale={[xScale, yScale, zScale]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}> 
            {   
                snap.currentFinishingArray[3]?<EmbossingMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />:
                <BasicMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />
            }
            <PrintSurfaceMaterial snap={snap} coating={coatingValue}/>
        </mesh>
        <mesh castShadow geometry={nodes.Mesh_0_3.geometry} scale={[xScale, yScale, zScale]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}> 
            {   
                snap.currentFinishingArray[3]?<EmbossingMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />:
                <BasicMaterial snap={snap} materials={materials} isControl={isControl} coating={coatingValue} />
            }
        </mesh>
    </>
}

export default Model