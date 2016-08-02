import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function createInfo({info}){
  return {__html: info.replace(/\\n/g, '<br/>')};
}

const ProjectInfo = ({type, width, height, showProjectInfo, hideProjectInfo, currentProject}) => {

  let child = <span key={'no_project_info'}></span>
  let left = -(height - 50) // padding between left side and menu
  let top = 370 // height of collapsed menu
  if(type === 'mobile'){
    left = -(height - 190) // width of menu
    top = 0
  }
  let style = {
    width: height,
    left,
    top,
  }

  if(showProjectInfo === true){
    child = (
      <div style={style} key={'project_info'} id={'project_info'} onClick={hideProjectInfo}>
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
  currentProject: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideProjectInfo: PropTypes.func.isRequired,
  showProjectInfo: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

export default ProjectInfo
