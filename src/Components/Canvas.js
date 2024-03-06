import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center, OrbitControls, Lightformer, Float } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { LayerMaterial, Color, Depth } from 'lamina'
import Model from './Model';

export const App = ({isControl, setIsControl, position = [0, 0, 2.5], fov = 25 }) => {
  const snap = useSnapshot(state)
  const [degraded, degrade] = useState(false);

  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.1} />
      <directionalLight intensity={snap.additionalLights?0.5:1} position={[5, snap.additionalLights?3:5, -10]} />
      {snap.additionalLights && 
        <>
          <directionalLight intensity={0.5} position={[-5, 3, -10]} />
          <directionalLight intensity={0.5} position={[5, 3, 10]} />
          <directionalLight intensity={0.5} position={[-5, 3, 10]} />
        </>
      }
      {/* <Environment files="/HDR/potsdamer_platz_1k.hdr" rotation={[0, Math.PI / 2, 0]}/> */}
      <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={0.8}>
        <Lightformers />
      </Environment>
      <CameraRig isControl={isControl} setIsControl={setIsControl}>
        <Backdrop />
        <Prints isControl={isControl}/>
      </CameraRig>
      {
        isControl && 
        <OrbitControls enableRotate={!snap.disableControl}/>
       }
    </Canvas>
  )
}

function Backdrop() {
  const snap = useSnapshot(state);
  const shadows = useRef()
  let initialHeight = snap.currentPrintSurface === 0?-0.031:-0.032;
  let scale = Number(snap.currentDimension['height']) / Number(snap.initialDimension[snap.currentStyleIndex].height);
  let exp = scale >= 0?1:-1;
  let height = initialHeight * scale * exp;
  
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[0, 0, 0]} position={[0, height, 0]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({isControl, setIsControl, children }) {
  const group = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    if (!isControl) {
      easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
      easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
      let isLocated = (state.camera.position.x === 0) && (state.camera.position.y === 0) && (state.camera.position.z === 2);
      if (isLocated) setIsControl(true);
    }
  })
  return <group ref={group}>{children}</group>
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={0.5} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="red" intensity={0.7} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth colorA="#777" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}

function Prints(props) {
  const snap = useSnapshot(state)
  const open = snap.currentPrintSurface === 1?'_open':'';

  const { nodes, materials } = useGLTF('/model/' + snap.style[snap.currentStyleIndex] + open + '.glb');

  return (
    <Model nodes={nodes} materials={materials} isControl={props.isControl}/>
  )
}

useGLTF.preload('/model/mailer.glb');
useGLTF.preload('/model/mailer_open.glb');
useTexture.preload('/texture/Coating/gloss.png');
useTexture.preload('/texture/Coating/matt.png');
useTexture.preload('/texture/Coating/none.png');
useTexture.preload('/texture/Coating/other.png');
useTexture.preload('/texture/Coating/satin.png');
useTexture.preload('/texture/Finish/texture/emboss.png');
useTexture.preload('/texture/Finish/texture/glossUV.png');
useTexture.preload('/texture/Finish/texture/goldenfoil.png');
useTexture.preload('/texture/material/coated.png');
useTexture.preload('/texture/material/kraft.png');
useTexture.preload('/texture/material/main.png');
useTexture.preload('/texture/material/microflute-kraft.png');
useTexture.preload('/texture/material/microflute-white.png');
useTexture.preload('/texture/material/other.png');
useTexture.preload('/texture/material/uncoated.png');
for (let index = 1; index < state.initialPrintSpec.length - 1; index++) {
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/1.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/2.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/3.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/4.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/5.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/6.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/7.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/8.png');
  useTexture.preload('/texture/PrintSpec/texture/'+ state.initialPrintSpec[index] + '/9.png');
}
useTexture.preload('/texture/PrintSurface/print-oneside.png');
useTexture.preload('/texture/PrintSurface/print-outside-inside.png');
