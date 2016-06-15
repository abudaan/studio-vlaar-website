import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Swipe from './swipe'

document.addEventListener('touchmove', (e) => {
  e.preventDefault()
})

document.addEventListener('DOMContentLoaded', () => {

  Swipe.init()

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})
