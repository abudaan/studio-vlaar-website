import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'
import {getBrowser} from './browser_check'


const MAX_HEIGHT_DESKTOP = 720

function calculateSizeAndOrientation(){

//  let orientation = screen.orientation || screen.oOrientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation
  let width = window.innerWidth
  let height = window.innerHeight
  let size, type
  let displayState = DisplayStates.MAIN
  let message = ''
  let orientation

  if(width > height){
    orientation = 'landscape'
  }else{
    orientation = 'portrait'
  }

  // if(typeof orientation === 'undefined'){
  //   if(width > height){
  //     orientation = 'landscape'
  //   }else{
  //     orientation = 'portrait'
  //   }
  // }
  // if(typeof orientation.type !== 'undefined'){
  //   orientation = orientation.type
  // }
  // if(orientation.indexOf('portrait') !== -1){
  //   orientation = 'portrait'
  // }else if(orientation.indexOf('landscape') !== -1){
  //   orientation = 'landscape'
  // }

  size = width * window.devicePixelRatio

  type = height >= MAX_HEIGHT_DESKTOP ? 'desktop' : 'mobile'

  if(orientation !== 'landscape'){
    displayState = DisplayStates.WARNING
    message = 'This website is best viewed in landscape mode'
  }

  return {size, width, height, type, orientation, displayState, message}
}


function calculateStateByIndex(operation, state){
  let index = state.index
  let maxIndex = state.projects.length
  let sliderAutoScroll = state.sliderAutoScroll
  if(sliderAutoScroll !== -1){
    clearInterval(state.sliderAutoScroll)
    sliderAutoScroll = -1
  }


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
    return {...state, index, sliderAnimStyle, sliderAutoScroll, currentProject: state.projects[index]}
  }

  return state
}


class Store extends ReduceStore {

  getInitialState(){

    let state = calculateSizeAndOrientation()

    if(state.orientation === 'landscape'){
      state.displayState = DisplayStates.MESSAGE
      state.message = 'loading...'
    }

    state = {
      ...state,
      ...getBrowser(),
      projects: [],
      imageFolder: '',
      currentProject: {},
      index: 0,
      sliderAnimStyle: {
        left: 0
      },
      showMenu: false,
      showProjectInfo: false,
      menuAutoHide: -1,
      sliderAutoScroll: -1,
      sliderAutoScrollDirection: 1,
    }

    return state
  }


  reduce(state, action) {

    let operation
    //console.log(action.type)
    switch(action.type) {

      case ActionTypes.MESSAGE:
        return {...state, ...action.payload, displayState: DisplayStates.MESSAGE}


      case ActionTypes.DATA_LOADED:
        if(state.displayState === DisplayStates.WARNING){
          return {
            ...state,
            ...action.payload,
          }
        }
        return {
          ...state,
          ...action.payload,
          displayState: DisplayStates.MAIN,
        }


      case ActionTypes.SET_SIZE:
      case ActionTypes.SET_ORIENTATION:
        // fix for ios 5.1
        let d = state.displayState
        let s = calculateSizeAndOrientation()
        if(d === DisplayStates.CONTACT && s.displayState !== DisplayStates.WARNING){
          s.displayState = DisplayStates.CONTACT
        }
        return {
          ...state,
          ...s,
        }


      case ActionTypes.START_AUTO_SLIDER:
        return {
          ...state,
          ...action.payload
        }


      case ActionTypes.STOP_AUTO_SLIDER:
        if(state.sliderAutoScroll !== -1){
          clearInterval(state.sliderAutoScroll)
          return {
            ...state,
            sliderAutoScroll: -1,
          }
        }
        return state


      case ActionTypes.SLIDER_NEXT_SLIDE:
        let index = state.index
        let maxIndex = state.projects.length
        let sliderAutoScrollDirection = state.sliderAutoScrollDirection

        index += sliderAutoScrollDirection

        if(index === maxIndex){
          index = maxIndex - 2
          sliderAutoScrollDirection = -1
        }else if(index === -1){
          index = 1
          sliderAutoScrollDirection = 1
        }

        let sliderAnimStyle = {
          left: -index * state.width,
          transition: '1s'
        }

        return {...state, index, sliderAnimStyle, sliderAutoScrollDirection, currentProject: state.projects[index]}


      case ActionTypes.SLIDER_CLICKED:

        let x = action.payload.event.nativeEvent.clientX

        if(x < state.width / 2){
          operation = '-'
        }else if(x >= state.width / 2){
          operation = '+'
        }

        return calculateStateByIndex(operation, state)


      case ActionTypes.SLIDER_SWIPED:

        let direction = action.payload.event.detail.direction

        if(direction === 'right'){
          operation = '-'
        }else if(direction === 'left'){
          operation = '+'
        }

        return calculateStateByIndex(operation, state)


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

        return calculateStateByIndex(operation, state)


      case ActionTypes.LOGO_CLICKED:
        let timeout = action.payload.timeout
        //console.log(timeout, state.timeout)
        if(state.timeout !== -1){
          clearTimeout(state.timeout)
        }
        let showMenu = !state.showMenu
        return {...state, showMenu, timeout}


      case ActionTypes.MENU_CLICKED:
        let id = action.payload.event.target.id
        switch(id){

          case 'contact':
            // let sliderAutoScroll = state.sliderAutoScroll
            // if(sliderAutoScroll !== -1){
            //   clearInterval(state.sliderAutoScroll)
            //   sliderAutoScroll = -1
            // }
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
