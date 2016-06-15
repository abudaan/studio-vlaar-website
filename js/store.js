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

  reduce(state, action) {

    switch(action.type) {

      case ActionTypes.SET_SIZE:
        return {...state, width: action.payload.width, height: action.payload.height}


      case ActionTypes.SET_INDEX:

        let x = action.payload.event.nativeEvent.clientX
        let index = state.index
        let maxIndex = state.projects.length

        if(x < state.width / 2){
          index--
        }else if(x >= state.width / 2){
          index++
        }

        if(index < 0){
          index = maxIndex - 1
        }else if(index >= maxIndex){
          //index = maxIndex - 1
          index = 0
        }

        let animStyle = {
          left: -index * state.width,
          transistion: '1s'
        }

        return {...state, index, animStyle}

      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
