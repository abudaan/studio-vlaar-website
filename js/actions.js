import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'

export default {

  setSize(){
    let width = window.innerWidth
    let height = window.innerHeight

    AppDispatcher.dispatch({
      type: ActionTypes.SET_SIZE,
      payload: {width, height}
    })
  },


  setIndex(event){
    AppDispatcher.dispatch({
      type: ActionTypes.SET_INDEX,
      payload: {event}
    })
  },

}
