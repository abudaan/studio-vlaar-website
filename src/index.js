import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

// necessary on ios when the address bar appears or disappears
const forceScroll = function(){
  setTimeout(() => {
    window.scrollTo(0, 1)
  }, 700)
}

// window.addEventListener('orientationchange', () => {
//   forceScroll()
// })

window.addEventListener('resize', () => {
  forceScroll()
  //document.getElementById('debug').innerHTML = window.innerWidth + 'x' + window.innerHeight
})


document.addEventListener('DOMContentLoaded', () => {
  forceScroll()
  Swipe.init()
  //document.getElementById('debug').innerHTML = window.innerWidth + 'x' + window.innerHeight

  if(typeof ReactDOM.render !== 'function'){
    document.getElementById('nojs').innerHTML = 'This browser is not supported.<br>Use a modern browser, or Internet Explorer 11'
    return
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})
