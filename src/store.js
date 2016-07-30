import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'
import {getBrowser} from './browser_check'


class Store extends ReduceStore {

  getInitialState(){
    return {
      ...getBrowser(),
      projects: [],
      imageFolder: '',
      displayState: DisplayStates.MESSAGE,
      message: 'loading...',
      width: window.innerWidth,
      height: window.innerHeight,
      size: window.innerWidth,
      orientation: 'landscape',
      index: 0,
      sliderAnimStyle: {
        left: 0
      },
      showMenu: false,
      showProjectInfo: false,
    }
  }


  calculateStateByIndex(operation, state){
    let index = state.index
    let maxIndex = state.projects.length

    if(operation === '+'){
      index++
    }else if(operation === '-'){
      index--
    }

    if(index < 0){
      index = 0
      // index = maxIndex - 1
    }else if(index >= maxIndex){
      index = maxIndex - 1
      // index = 0
    }

    if(index !== state.index){
      let sliderAnimStyle = {
        left: -index * state.width,
        transition: '1s'
      }
      return {...state, index, sliderAnimStyle, currentProject: state.projects[index]}
    }

    return state
  }


  calculateStateBySizeAndOrientation(state){
    let orientation = screen.orientation || screen.oOrientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation
    let width = window.innerWidth
    let height = window.innerHeight
    let size
    let sliderAnimStyle

    if(typeof orientation === 'undefined'){
      if(width > height){
        orientation = 'landscape'
      }else{
        orientation = 'portrait'
      }
    }
    if(typeof orientation.type !== 'undefined'){
      orientation = orientation.type
    }
    if(orientation.indexOf('portrait') !== -1){
      orientation = 'portrait'
      //width = window.innerHeight
      //height = window.innerWidth
    }else if(orientation.indexOf('landscape') !== -1){
      orientation = 'landscape'
    }

    sliderAnimStyle = {
      left: -state.index * width,
      transition: '0s'
    }

    size = state.width * window.devicePixelRatio

    // if(state.os === 'ios' || state.os === 'android'){
    //   size = Math.max(state.width, state.height) * window.devicePixelRatio
    // }

    console.log(state.os)
    if(state.os !== 'ios' && state.os !== 'android'){
      orientation = 'landscape'
    }

    return {...state, size, sliderAnimStyle, width, height, orientation}
  }

  reduce(state, action) {

    let operation
    let currentProject

    switch(action.type) {

      case ActionTypes.MESSAGE:
        return {...state, ...action.payload, displayState: DisplayStates.MESSAGE}


      case ActionTypes.DATA_LOADED:
        currentProject = action.payload.data.projects[0]
        let {width, height, size, orientation} = this.calculateStateBySizeAndOrientation(state)
        return {...state, ...action.payload.data, displayState: DisplayStates.MAIN, currentProject, size, width, height, orientation}


      case ActionTypes.SET_SIZE:
      case ActionTypes.SET_ORIENTATION:
        return this.calculateStateBySizeAndOrientation(state)


      case ActionTypes.SLIDER_CLICKED:

        let x = action.payload.event.nativeEvent.clientX

        if(x < state.width / 2){
          operation = '-'
        }else if(x >= state.width / 2){
          operation = '+'
        }

        return this.calculateStateByIndex(operation, state)


      case ActionTypes.SLIDER_SWIPED:

        let direction = action.payload.event.detail.direction

        if(state.orientation === 'landscape'){
          if(direction === 'right'){
            operation = '-'
          }else if(direction === 'left'){
            operation = '+'
          }
        }else{
          if(direction === 'down'){
            operation = '-'
          }else if(direction === 'up'){
            operation = '+'
          }
        }

        return this.calculateStateByIndex(operation, state)


      case ActionTypes.SLIDER_KEYPRESS:
        //console.log(action.payload.event)
        let evt = action.payload.event
        let keycode = evt.keyCode

        if(keycode === 37){
          evt.defaultPrevented
          evt.preventDefault()
          operation = '-'
        }else if(keycode === 39){
          evt.defaultPrevented
          evt.preventDefault()
          operation = '+'
        }

        return this.calculateStateByIndex(operation, state)


      case ActionTypes.LOGO_CLICKED:
        let showMenu = !state.showMenu
        return {...state, showMenu}


      case ActionTypes.MENU_CLICKED:
        let id = action.payload.event.target.id
        switch(id){

          case 'contact':
            if(state.displayState === DisplayStates.MAIN){
              return {...state, displayState: DisplayStates.CONTACT, showProjectInfo: false}
            }
            return {...state, displayState: DisplayStates.MAIN, showProjectInfo: false}

          case 'project':
            if(state.displayState !== DisplayStates.MAIN){
              return {...state, displayState: DisplayStates.MAIN, showProjectInfo: true}
            }else if(state.showProjectInfo === false){
              return {...state, showProjectInfo: true}
            }
            return {...state, showProjectInfo: false}

          case 'pinterest':
            window.open(state.pinterestUrl)
            return state

          case 'instagram':
            window.open(state.instagramUrl)
            return state

          default:
            return state

        }

      case ActionTypes.HIDE_MENU:
        return {...state, showMenu: false}

      case ActionTypes.HIDE_PROJECT_INFO:
        return {...state, showProjectInfo: false}

      case ActionTypes.HIDE_CONTACT:
        return {...state, displayState: DisplayStates.MAIN}


      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
