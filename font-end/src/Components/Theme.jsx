import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage'

export default function Theme({close, theme}) {
    const[theme1,setTheme1]=useLocalStorage('theme'? theme:'one')
    const[theme2,setTheme2]=useLocalStorage()
    const[theme3,setTheme3]=useLocalStorage()
    const swichtTheme=()=>{
        const newTheme= theme1==='one'?theme:'one'
        setTheme1(newTheme)
    }
  return (
    <>
        <div className='theme'>
            <div className='theme-1' onClick={swichtTheme}></div>
            <div className='theme-2'></div>
            <div className='theme-3'></div>
            <div className='theme-4'></div>
            <div className='theme-5'></div>
            <div className='theme-6'></div>
            <div className='theme-7'></div>
        </div>
    </>
  )
}
