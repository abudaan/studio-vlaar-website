import React, {Component} from 'react'
import {Container} from 'flux/utils'
import Actions from '../actions'
import Contact from '../components/contact'
import Menu from '../components/menu'
import ProjectInfo from '../components/project_info'
import ImageSlider from '../components/image_slider'
import Store from '../store'
import * as DisplayStates from '../constants/display_states'
import {fetchJSON} from '../fetch_helpers'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


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
        component = <div key={'loading'} >{'loading...'}</div>
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
          displayState={this.state.displayState}
          showMenu={this.state.showMenu}
          logoClicked={Actions.logoClicked}
          menuClicked={Actions.menuClicked}
          hideMenu={Actions.hideMenu}
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
            showProjectInfo={this.state.showProjectInfo}
            currentProject={this.state.currentProject}
          />
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Container.create(App)
