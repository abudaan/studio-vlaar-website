import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import {fetchJSON} from './fetch_helpers'


export default {

  message(message){
    AppDispatcher.dispatch({
      type: ActionTypes.MESSAGE,
      payload: {message}
    })
  },


  loadData(){
    fetchJSON('./data.json')
    .then(data => {
      AppDispatcher.dispatch({
        type: ActionTypes.DATA_LOADED,
        payload: {...data, currentProject: data.projects[0]}
      })
    })
  },


  startAutoSlider(){
    let sliderAutoScroll = setInterval(() => {
      AppDispatcher.dispatch({
        type: ActionTypes.SLIDER_NEXT_SLIDE,
      })
    }, 5000)
    AppDispatcher.dispatch({
      type: ActionTypes.START_AUTO_SLIDER,
      payload: {sliderAutoScroll}
    })
  },

  // currently not in use
  stopAutoSlider(){
    AppDispatcher.dispatch({
      type: ActionTypes.STOP_AUTO_SLIDER,
    })
  },


  setSize(){
    AppDispatcher.dispatch({
      type: ActionTypes.SET_SIZE,
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


  logoClicked(menuIsShowing){
    let timeout = -1
    if(menuIsShowing === false){
      // close menu automatically after 5 seconds
      timeout = setTimeout(() => {
        AppDispatcher.dispatch({
          type: ActionTypes.LOGO_CLICKED,
          payload: {timeout: -1}
        })
      }, 15000)
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
