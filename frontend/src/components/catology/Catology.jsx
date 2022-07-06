import { listClasses } from '@mui/material'
import React from 'react'
import { CatologyData } from './CatologyData'
import "./Catology.css"

export default function Catology() {
  return (
    <div className='bodyCatology'>
        <span className='titleslider'>Danh Mục</span>
        <hr className="sidebarHr" />
        <div className='bodycardCatology'>
          {CatologyData.map((list) => {
            return(
              <div className='cardCatology'>
                  <img src={list.image} alt={list.title} />
                  <span>- {list.title} -</span>
              </div>
            );
        })}
        </div>
    
    </div>
  )
}
