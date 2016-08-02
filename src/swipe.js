// credits: http://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android/23230280#23230280

let xDown = null
let yDown = null
let lastEvent = null
const mAbs = Math.abs
const minDistance = 100


const createEvent = function(type, detail){
  if(typeof window.CustomEvent === 'undefined'){
    let event = document.createEvent('CustomEvent')
    event.initCustomEvent(type, true, true, detail)
    document.dispatchEvent(event)
  }else{
    document.dispatchEvent(new CustomEvent(type, {detail}))
  }
}

const Swipe = {

  init(){
    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchmove', this.handleTouchMove, false)
    document.addEventListener('touchend', this.handleTouchEnd, false)
  },

  handleTouchStart(evt){
    //evt.preventDefault()
    xDown = evt.touches[0].clientX
    yDown = evt.touches[0].clientY
  },

  handleTouchMove(evt){
    evt.defaultPrevented
    evt.preventDefault() // this also prevents zooming!
    lastEvent = evt
  },

  handleTouchEnd(evt){
    //evt.preventDefault()

    if(lastEvent === null){
      return
    }

    let xUp = lastEvent.touches[0].clientX
    let yUp = lastEvent.touches[0].clientY

    let xDiff = xDown - xUp
    let yDiff = yDown - yUp

    if(mAbs(xDiff) > mAbs(yDiff)){
      if(xDiff > minDistance){
        createEvent('swipe', {direction: 'left'})
      }else if(xDiff < -minDistance){
        createEvent('swipe', {direction: 'right'})
      }
    }else if(mAbs(xDiff) <= mAbs(yDiff)){
      if(yDiff > minDistance){
        createEvent('swipe', {direction: 'up'})
      }else if(yDiff < -minDistance){
        createEvent('swipe', {direction: 'down'})
      }
    }

    /* reset values */
    xDown = null
    yDown = null
    lastEvent = null
  }
}

export default Swipe

