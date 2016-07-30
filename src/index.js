import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

const showSize = function(){
  document.getElementById('debug').innerHTML = window.innerWidth + ' ' + window.innerHeight + ' ' + screen.width + ' ' + screen.height
}

// const forceScroll = function(){
//   setTimeout(() => {
//     window.scrollTo(0, 1)
//   }, 500)
// }

window.addEventListener('orientationchange', () => {
//   forceScroll()
  showSize()
})

window.addEventListener('resize', () => {
  showSize()
})

// document.addEventListener('touchmove', e => {
//   e.preventDefault() // this also prevents zooming!
// })



document.addEventListener('DOMContentLoaded', () => {
  //forceScroll()
  //Swipe.init()
  showSize()

  // ReactDOM.render(
  //   <App />,
  //   document.getElementById('app')
  // )
})

