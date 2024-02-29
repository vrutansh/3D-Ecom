import React, {useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import{downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';

import {fadeAnimation, slideAnimation} from '../config/motion';

import {AIpicker, Colorpicker, CustomButton, Filepicker, Tab } from '../components'

const Customizer = () => {
     const snap = useSnapshot(state);
      const [file, setfile]   = useState('');
      const [prompt, setpromt]   = useState('');
     const [generatingImg, settingImg]   = useState(false);
     const [activeEditorTab, setactiveEditorTab]   = useState("");
     const [activeFilterTab, setactiveFilterTab]   = useState({
        logoshirt: true,
        stylishshirt: false,
  });

  const generateTabContent = ()=>{
        switch(activeEditorTab) {
          case "colorpicker":
            return <Colorpicker />
          case "filepicker":
            return <Filepicker file={file} setfile={setfile} readfile={readfile}/>
          case "aipicker":
            return <AIpicker />
          default:
            return null;
  }
 }
 
 const handleDecals= (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateproperty] = result;
        if(!activeFilterTab[decalType.FilterTab]){
          handleActiveFilterTab(decalType.FilterTab)
        }
      }
      const handleActiveFilterTab = (tabName) => {
        switch(tabName){
          case "logoShirt":
            state.isLogoTexture = !activeFilterTab[tabName];
          break;
          case "stylishShirt":
            state.isFullTexture =!activeFilterTab[tabName];
          default:
            state.isLogoTexture=true;
            state.isFullTexture=false;
        }
      }
 
 const readfile = (type)=>{
      reader(file)
        .then((result) => {
          handleDecals(type, result);
          setactiveEditorTab("");
        })
 }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
         <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>

              <div className='flex items-center min-h-screen '>
                 <div className='editorstabs-container tabs '>
                  {EditorTabs.map((tab)=>(
                    <Tab key={tab.name} tab={tab}  handleClick={() => setactiveEditorTab(tab.name)}/>
                  ))}

                  {generateTabContent()}
                 </div>
              </div>
         </motion.div>

         <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
              <CustomButton type="filled" title="GO Back" handleClick={()=> state.intro = true} customStyle="w-fit px-4 py-2.5 font-bold text-sm"/>
         </motion.div>

         <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab)=>(
                    <Tab key={tab.name} tab={tab} isFilterTab isActiveTab="" handleClick={() => {}}/>
                  ))}
         </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer