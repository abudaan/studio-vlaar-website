import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

document.addEventListener('touchmove', (e) => {
  e.preventDefault() // this also prevents zooming!
})

document.addEventListener('DOMContentLoaded', () => {

  Swipe.init()

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})
