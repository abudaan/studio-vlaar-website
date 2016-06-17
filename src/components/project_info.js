import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function createInfo({id, info}){
  let html = `#${id}<br/>-<br/>${info.replace(/\\n/g, '<br/>')}`
  return {__html: html};
}

const ProjectInfo = ({showProjectInfo, currentProject}) => {

  let child = <span key={'no_project_info'}></span>

  if(showProjectInfo === true){
    child = (
      <div key={'project_info'} id={'project_info'}>
        <ReactCSSTransitionGroup
          transitionName={'project_info'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
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
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
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
