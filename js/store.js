import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'


class Store extends ReduceStore {

  getInitialState(){
    return {
      projects: [
        {
          title: 'project1',
          image: 'project1.jpg'
        },
        {
          title: 'project2',
          image: 'project2.jpg'
        },
        {
          title: 'project3',
          image: 'project3.jpg'
        },
        {
          title: 'project4',
          image: 'project4.jpg'
        },
        {
          title: 'project5',
          image: 'project5.jpg'
        },
        {
          title: 'project6',
          image: 'project6.jpg'
        },
      ],
      imageFolder: './img',
      width: window.innerWidth,
      height: window.innerHeight,
      index: 0,
      animStyle: {
        left: 0
      }
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

      case ActionTypes.SET_SIZE:
        return {...state, width: action.payload.width, height: action.payload.height}


      case ActionTypes.SLIDER_CLICKED:

        let x = action.payload.event.nativeEvent.clientX

        if(x < state.width / 2){
          operation = '-'
        }else if(x >= state.width / 2){
          operation = '+'
        }
        return state
//        return this.calculateStateByIndex(operation, state)

      case ActionTypes.SLIDER_SWIPED:

        let direction = action.payload.event.detail.direction
        if(direction === 'right'){
          operation = '-'
        }else if(direction === 'left'){
          operation = '+'
        }

        return this.calculateStateByIndex(operation, state)


      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
