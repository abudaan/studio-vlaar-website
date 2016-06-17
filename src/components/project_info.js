import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function createInfo({id, info}){
  let html = `#${id}<br/>-<br/>${info.replace(/\\n/g, '<br/>')}`
  return {__html: html};
}

const ProjectInfo = ({showProjectInfo, currentProject}) => {
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

  let child = <span key={'no_project_info'}></span>

  if(showProjectInfo === true){
    child = (
      <div key={'project_info'} id={'project_info'}>
        <ReactCSSTransitionGroup
          transitionName={'project_info'}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          <div
            key={currentProject.id}
            className={'project_info_text'}
            dangerouslySetInnerHTML={createInfo(currentProject)}
          />
        </ReactCSSTransitionGroup>

      </div>
    )
  }

  return (
    <ReactCSSTransitionGroup
      transitionName={'project_info'}
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
    >
      {child}
    </ReactCSSTransitionGroup>
  )
}


ProjectInfo.propTypes = {
  showProjectInfo: PropTypes.bool,
  currentProject: PropTypes.object
}

export default ProjectInfo
