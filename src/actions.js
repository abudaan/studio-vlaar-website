import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'

export default {

  message(message){
    AppDispatcher.dispatch({
      type: ActionTypes.MESSAGE,
      payload: {message}
    })
  },

  dataLoaded(data){
    AppDispatcher.dispatch({
      type: ActionTypes.DATA_LOADED,
      payload: {data}
    })
  },

  setSize(){
    let width = window.innerWidth
    let height = window.innerHeight

    AppDispatcher.dispatch({
      type: ActionTypes.SET_SIZE,
      payload: {width, height}
    })
  },

  setOrientation(){
    AppDispatcher.dispatch({
      type: ActionTypes.SET_ORIENTATION,
    })
  },


  sliderClicked(event){
    AppDispatcher.dispatch({
      type: ActionTypes.SLIDER_CLICKED,
      payload: {event}
    })
  },


  sliderSwiped(event){
    AppDispatcher.dispatch({
      type: ActionTypes.SLIDER_SWIPED,
      payload: {event}
    })
  },


  sliderKeyPress(event){
    AppDispatcher.dispatch({
      type: ActionTypes.SLIDER_KEYPRESS,
      payload: {event}
    })
  },


  logoClicked(){
    AppDispatcher.dispatch({
      type: ActionTypes.LOGO_CLICKED,
    })
  },

  menuClicked(event){
    AppDispatcher.dispatch({
      type: ActionTypes.MENU_CLICKED,
      payload: {event}
    })
  },


  hideMenu(){
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_MENU,
    })
  },


  hideProjectInfo(){
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_PROJECT_INFO,
    })
  },


  hideContact(){
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_CONTACT,
    })
  },

}
