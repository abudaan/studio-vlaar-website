import React, {Component} from 'react'
import {Container} from 'flux/utils'
import Actions from '../actions'
import Contact from '../components/contact'
import Menu from '../components/menu'
import ProjectInfo from '../components/project_info'
import ImageSlider from '../components/image_slider'
import Store from '../store'
import * as DisplayStates from '../constants/display_states'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


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
    this._windowKeyPressListener = this._handleKeyPress.bind(this)
    this._orientationChangeListener = this._handleOrientationChange.bind(this)
    this._swipeListener = this._handleSwipe.bind(this)
    Actions.loadData()
  }

  componentDidMount() {
    document.addEventListener('keydown', this._windowKeyPressListener)
    document.addEventListener('swipe', this._swipeListener)
    // if(this.state.os !== 'ios'){
    //   window.addEventListener('resize', this._windowResizeListener)
    // }
    window.addEventListener('resize', this._windowResizeListener)
    window.addEventListener('orientationchange', this._orientationChangeListener)
    Actions.startAutoSlider()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._windowKeyPressListener)
    document.removeEventListener('swipe', this._swipeListener)
    // if(this.state.os !== 'ios'){
    //   window.removeEventListener('resize', this._windowResizeListener)
    // }
    window.removeEventListener('resize', this._windowResizeListener)
    window.removeEventListener('orientationchange', this._orientationChangeListener)
  }

  _handleResize(){
    Actions.setSize()
  }

  _handleKeyPress(e){
    Actions.sliderKeyPress(e)
  }

  _handleSwipe(e){
    Actions.sliderSwiped(e)
  }

  _handleOrientationChange(e){
    Actions.setOrientation()
  }

  render(){
    let component = null

    //console.log(this.state)

    switch(this.state.displayState){

      case DisplayStates.WARNING:
        return <div key={'warning'} className="message">{this.state.message}</div>

      case DisplayStates.MESSAGE:
        // return <div key={'loading'} className="message">{this.state.message}</div>
        component = <div key={'loading'} className="message">{this.state.message}</div>
        break

      case DisplayStates.MAIN:
        component = <ImageSlider key={'imageslider'} {...this.state} sliderClicked={Actions.sliderClicked} />
        break

      case DisplayStates.CONTACT:
        component = <Contact key={'contact'} {...this.state} hideContact={Actions.hideContact}/>
        break

      default:
        // let's take a walk in the woods

    }

    return (
      <div>
        <Menu
          {...this.state}
          hideMenu={Actions.hideMenu}
          logoClicked={Actions.logoClicked}
          menuClicked={Actions.menuClicked}
        />
        <ReactCSSTransitionGroup
          component={'div'}
          transitionName={'component'}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {component}
          <ProjectInfo
            {...this.state}
            showProjectInfo={this.state.showProjectInfo}
            hideProjectInfo={Actions.hideProjectInfo}
            currentProject={this.state.currentProject}
          />
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Container.create(App)
