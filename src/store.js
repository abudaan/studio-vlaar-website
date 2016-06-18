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


  reduce(state, action) {

    let size
    let operation
    let currentProject
    let sliderAnimStyle

    switch(action.type) {

      case ActionTypes.MESSAGE:
        return {...state, ...action.payload, displayState: DisplayStates.MESSAGE}


      case ActionTypes.DATA_LOADED:
        currentProject = action.payload.data.projects[0]
        size = Math.max(state.width, state.height)
        //alert(state.width + ' : ' + state.height)
        return {...state, ...action.payload.data, displayState: DisplayStates.MAIN, currentProject, size}


      case ActionTypes.SET_SIZE:
        sliderAnimStyle = {
          left: -state.index * action.payload.width,
          transition: '0s'
        }
        size = Math.max(state.width, state.height)
        return {...state, sliderAnimStyle, width: action.payload.width, height: action.payload.height, size}


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

        if(direction === 'right'){
          operation = '-'
        }else if(direction === 'left'){
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
