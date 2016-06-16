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
      displayState: DisplayStates.LOADING,
      width: window.innerWidth,
      height: window.innerHeight,
      index: 0,
      animStyle: {
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
      let animStyle = {
        left: -index * state.width,
        transistion: '1s'
      }
      return {...state, index, animStyle}
    }

    return state
  }


  reduce(state, action) {

    let operation

    switch(action.type) {

      case ActionTypes.DATA_LOADED:
        return {...state, ...action.payload.data, displayState: DisplayStates.MAIN}


      case ActionTypes.SET_SIZE:
        return {...state, width: action.payload.width, height: action.payload.height}


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
            return {...state, displayState: DisplayStates.CONTACT}

          default:
            return state

        }


      case ActionTypes.SHOW_MENU:
        return {...state, showMenu: true}

      case ActionTypes.HIDE_MENU:
        return {...state, showMenu: false}

      case ActionTypes.SHOW_PROJECT_INFO:
        return {...state, showProjectInfo: true}

      case ActionTypes.HIDE_PROJECT_INFO:
        return {...state, showProjectInfo: false}


      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
