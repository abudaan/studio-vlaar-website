import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

// necessary on ios when the address bar appears or disappears
const forceScroll = function(){
  setTimeout(() => {
    window.scrollTo(0, 1)
  }, 500)
}

window.addEventListener('orientationchange', () => {
  forceScroll()
})

document.addEventListener('DOMContentLoaded', () => {
  forceScroll()
  Swipe.init()

  document.getElementById('debug').innerHTML = window.innerWidth + 'x' + window.innerHeight

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})
