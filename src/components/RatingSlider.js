import './RatingSlider.css'
import wolfImage from './../assets/wolf-icon.svg'
import { useEffect, useRef, useState } from 'react'

let isDragging = false;

function RatingSlider({rating, setRating}) {
  const trackRef = useRef()
  const trackCoveredRef = useRef()
  const thumbRef = useRef()

  const onSeekClick = (event) => {
    const newRating = Math.round(10 * (event.pageX - trackRef.current.getBoundingClientRect().x) 
      / trackRef.current.offsetWidth)
    setRating(newRating)
  }

  return (
    <div style={{padding: '0px 18px'}}>
      <div className='rating-slider'>
        <div ref={trackRef} className='rating-slider-track' onClick={onSeekClick}>
          {[0,0,0,0,0,0,0,0,0].map((i, index) => {
            return <span key={index}></span>
          })}
        </div>
        <div ref={trackCoveredRef} style={{width: rating * 10 + '%'}} onClick={onSeekClick} className='rating-slider-track-covered'></div>
        <div ref={thumbRef} style={{left: rating * 10 + '%'}} 
          className='rating-slider-thumb'>
          <img src={wolfImage} />
        </div>
      </div>
    </div>
  )
}

export default RatingSlider