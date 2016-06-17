import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function createInfo({info}){
  return {__html: info.replace(/\\n/g, '<br/>')};
}

const ProjectInfo = ({showProjectInfo, hideProjectInfo, currentProject}) => {

  let child = <span key={'no_project_info'}></span>

  if(showProjectInfo === true){
    child = (
      <div key={'project_info'} id={'project_info'} onClick={hideProjectInfo}>
        <ReactCSSTransitionGroup
          transitionName={'project_info'}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <div key={currentProject.id} id={'project_info_container'}>
            <div className={'project_info_item'}>{'#' + currentProject.id}</div>
            <div className={'project_info_item'}>{'-'}</div>
            <div className={'project_info_item'} dangerouslySetInnerHTML={createInfo(currentProject)}/>
          </div>
        </ReactCSSTransitionGroup>

      </div>
    )
  }

  return (
    <ReactCSSTransitionGroup
      transitionName={'project_info'}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
    >
      {child}
    </ReactCSSTransitionGroup>
  )
}


ProjectInfo.propTypes = {
  showProjectInfo: PropTypes.bool,
  hideProjectInfo: PropTypes.func,
  currentProject: PropTypes.object
}

export default ProjectInfo
