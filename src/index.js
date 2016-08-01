import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

const forceScroll = function(){
  setTimeout(() => {
    window.scrollTo(0, -1)
  }, 500)
}

window.addEventListener('orientationchange', () => {
  forceScroll()
})


document.addEventListener('touchmove', e => {
  e.preventDefault() // this also prevents zooming!
})

document.addEventListener('DOMContentLoaded', () => {
  forceScroll()
  Swipe.init()

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})
