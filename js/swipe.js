// credits: http://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android/23230280#23230280

let xDown = null
let yDown = null
let lastEvent = null
const mAbs = Math.abs

const Swipe = {

  init(){
    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchmove', this.handleTouchMove, false)
    document.addEventListener('touchend', this.handleTouchEnd, false)
  },

  handleTouchStart(evt){
    xDown = evt.touches[0].clientX
    yDown = evt.touches[0].clientY
  },

  handleTouchMove(evt){
    lastEvent = evt
  },

  handleTouchEnd(){
    if(typeof xDown === 'undefined' || typeof yDown === 'undefined'){
      return
    }

    let xUp = lastEvent.touches[0].clientX
    let yUp = lastEvent.touches[0].clientY

    let xDiff = xDown - xUp
    let yDiff = yDown - yUp

    if(mAbs(xDiff) > mAbs(yDiff)){
      if(xDiff > 0){
        document.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'left'}}))
      }else{
        document.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'right'}}))
      }
    }else{
      if(yDiff > 0){
        document.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'up'}}))
      } else{
        document.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'down'}}))
      }
    }

    /* reset values */
    xDown = null
    yDown = null
  }
}

export default Swipe

