import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Transition = ({children}) => {

  return(
    <ReactCSSTransitionGroup
      transitionName="component"
      transitionAppear={true}
      transitionAppearTimeout={200}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
    >
      {children}

    </ReactCSSTransitionGroup>
  )
}

Transition.propTypes = {
}

export default Transition
