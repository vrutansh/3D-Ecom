import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import{headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation} from '../config/motion'
import {CustomButton} from '../components'

const Home = () => {
    const snap = useSnapshot(state)
  return (
    <AnimatePresence>
        { snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')} >
                    <img src="./threejs.png" alt="lodo" className='w-8 h-8 object-contain' />
                </motion.header>
             
             <motion.div className='head-content' {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            LET'S <br className='xl:block hidden' />DO IT
                        </h1>
                </motion.div>
                <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='max-w-md font-normal text-base text-grey-600'>
                        Create Your Unique and Exclusive T-shirt with our brand new 3D customization tool. <strong>Unleash your imaginations</strong>{""} and Define your Style.
                    </p>

                    <CustomButton type="filled" title="Customised it" handleClick={()=> state.intro = false} customStyle="w-fit px-4 py-2.5 font-bold text-sm" />
                </motion.div>
             </motion.div>

             
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home