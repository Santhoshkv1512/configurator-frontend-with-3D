import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import MainBoard from './MainBoard';

export function Overlay(props) {
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <img src='/logo.png' />
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
          <AiOutlineShopping size="3em" />
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h1>Duncan Print Group</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}>
                  <p>Are you tired of wasting time and energy coordinating with multiple printing vendors? Look no further. Our Service is here to simplify your printing needs and save you valuable resources.</p>
                  <button className='button' style={{background: snap.color}} onClick={() => {state.intro = false}}>
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            <MainBoard />
            <Customizer setIsControl={props.setIsControl}/>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

function Customizer(props) {
  const snap = useSnapshot(state)

  const clickBackBtn = () => {
    state.intro = true;
    props.setIsControl(false);
  }

  const clickLightBtn = (e) => {
    state.additionalLights = !state.additionalLights;
  }
  return (
    <>
      <div className="customizer">
        <button
          className="share"
          style={{ background: snap.color }}
          onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'photo.png')
            link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
          }}>
          Take a Photo
          <AiFillCamera size="1.3em" />
        </button>
        <button className="exit" style={{ background: snap.color }} onClick={() => clickBackBtn()}>
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
        <button className="addLight" style={{ background: snap.color }} onClick={() => clickLightBtn()}>
          {!snap.additionalLights?'Turn On Lights':'Turn Off Lights'}
        </button>
      </div>
    </>
  )
}
