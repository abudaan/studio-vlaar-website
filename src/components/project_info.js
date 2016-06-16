import React, {PropTypes} from 'react'
import * as DisplayStates from '../constants/display_states'


const divStyle = {
}

const ProjectInfo = ({showProjectInfo, info, number, width}) => {
/*
  let menu = document.getElementsByClassName('menu_collapsed')[0]
  let animStyle1 = {}
  let animStyle2 = {}
  let duration = '0.5s'
  let height = 170

  if(typeof menu !== 'undefined'){
    height = getComputedStyle(menu).height.replace('px', '')
  }

  if(showMenu === true){
    animStyle1 = {
      height: height + 'px',
      transition: duration
    }
    animStyle2 = {
      top: 0,
      transition: duration
    }
  }else{
    animStyle1 = {
      height: 0,
      transition: duration
    }
    animStyle2 = {
      top: -height + 'px',
      transition: duration
    }
  }

*/

  let menu = document.getElementsByClassName('project_info_text')[0]
  let divWidth
  if(typeof menu !== 'undefined'){
    divWidth = getComputedStyle(menu).width.replace('px', '')
  }

  let style = {
    //marginLeft: -divWidth + 'px'
  }

  return (
    <div id={'project_info'}>
      <div className={'project_info_text'} style={style}>
        {'#'+number}<br/>
        {'-'}<br/>
        {info}
      </div>
    </div>
  )
}


ProjectInfo.propTypes = {
}

export default ProjectInfo
