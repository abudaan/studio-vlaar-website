import React, {Component} from 'react'
import {Container} from 'flux/utils'
import Actions from '../actions'
import Authorize from '../components/authorize'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import Store from '../store'
import * as DisplayStates from '../constants/display_states'

// only component with state

class App extends Component{

  static displayName = 'App'

  static getStores() {
    return [Store];
  }

  static calculateState(prevState){
    //console.log(prevState)
    return {...Store.getState()}
  }

  constructor(){
    super()
    this.index = Store.getState().index
    this._windowResizeListener = this._handleResize.bind(this)
    this._swipeListener = this._handleSwipe.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._windowResizeListener)
    document.addEventListener('swipe', this._swipeListener)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._windowResizeListener)
    document.removeEventListener('swipe', this._swipeListener)
  }

  _handleResize(){
    Actions.setSize()
  }

  _handleSwipe(e){
    Actions.sliderSwiped(e)
  }

  render(){
    if(this.index !== this.state.index){
      this.index = this.state.index
    }
    return <ImageSlider {...this.state} sliderClicked={Actions.sliderClicked} />


/*
    switch(this.state.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={Actions.login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.state} selectBoard={Actions.selectBoard} selectInterval={Actions.selectInterval} start={Actions.start}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.state} nextImage={Actions.nextImage} />

      case DisplayStates.MESSAGE:
        return <div className={'message'}>{this.state.message}</div>

      default:
        return false
    }
*/
  }
}

export default Container.create(App)
