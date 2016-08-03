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
      payload: {...data}
    })
  },

  setSize(){
    AppDispatcher.dispatch({
      type: ActionTypes.SET_SIZE,
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


  logoClicked(menuIsShowing){
    let timeout = -1
    if(menuIsShowing === false){
      // close menu automatically after 5 seconds
      timeout = setTimeout(() => {
        AppDispatcher.dispatch({
          type: ActionTypes.LOGO_CLICKED,
          payload: {timeout: -1}
        })
      }, 5000)
    }
    AppDispatcher.dispatch({
      type: ActionTypes.LOGO_CLICKED,
      payload: {timeout}
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
