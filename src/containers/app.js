import React, {Component} from 'react'
import {Container} from 'flux/utils'
import Actions from '../actions'
import Contact from '../components/contact'
import Menu from '../components/menu'
import ImageSlider from '../components/image_slider'
import Store from '../store'
import * as DisplayStates from '../constants/display_states'
import {fetchJSON} from '../fetch_helpers'

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
    fetchJSON('./data.json')
    .then(Actions.dataLoaded)
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

    let component = null

    switch(this.state.displayState){

      case DisplayStates.LOADING:
        component = <div>{'loading...'}</div>
        break

      case DisplayStates.MAIN:
        component = <ImageSlider {...this.state} sliderClicked={Actions.sliderClicked} />
        break

      case DisplayStates.CONTACT:
        component = <Contact {...this.state} />
        break

      default:
        // let's take a walk in the woods

    }

    return (
      <div>
        <Menu showMenu={this.state.showMenu} logoClicked={Actions.logoClicked}/>
        {component}
      </div>
    )
  }
}

export default Container.create(App)
