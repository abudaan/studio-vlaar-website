import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'

export default {

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


  logoClicked(){
    AppDispatcher.dispatch({
      type: ActionTypes.LOGO_CLICKED,
    })
  },

  showMenu(){
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_MENU,
    })
  },


  hideMenu(){
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_MENU,
    })
  },


  showProjectInfo(){
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_PROJECT_INFO,
    })
  },


  hideProjectInfo(){
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_PROJECT_INFO,
    })
  },

}
