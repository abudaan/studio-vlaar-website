import React, {PropTypes} from 'react'
import * as DisplayStates from '../constants/display_states'


const Menu = ({showMenu, logoClicked, menuClicked, hideMenu, displayState, showProjectInfo}) => {

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


  let menuItems
  let contactClass = 'menu_link'
  let projectClass = 'menu_link'

  if(displayState === DisplayStates.CONTACT){
    contactClass = 'menu_link menu_link_selected'
  }

  if(showProjectInfo === true){
    projectClass = 'menu_link menu_link_selected'
  }

  menuItems = (
    <div id={'menu_items_container'}>
      <div className={contactClass} id={'contact'} onClick={menuClicked}>{'contact'}</div>
      <div className={'separator2'} >{'-'}</div>
      <div className={'menu_link'} id={'pinterest'} onClick={menuClicked}>{'pinterest'}</div>
      <div className={'separator2'}>{'-'}</div>
      <div className={'menu_link'} id={'instagram'} onClick={menuClicked}>{'instagram'}</div>
      <div className={'separator2'}>{'-'}</div>
      <div className={projectClass} id={'project'} onClick={menuClicked}>{'project'}</div>
      <div className={'menu_link close'} onClick={hideMenu}>{'x'}</div>
    </div>
  )

  return (
    <div className={'menu'}>
      <div className={'menu_logo'}>
        <img id={'menu_logo_img_mobile'} src={'./img/logo-mobile.svg'} onClick={logoClicked}></img><br/>
        <img id={'menu_logo_img_desktop'} src={'./img/logo-desktop.svg'} onClick={logoClicked}></img><br/>
      </div>
      <div className={'menu_anim_container'} style={animStyle1}>
        <div className={'menu_collapsed'} style={animStyle2}>
          {menuItems}
        </div>
      </div>
    </div>
  )
}


Menu.propTypes = {
  displayState: PropTypes.string.isRequired,
  hideMenu: PropTypes.func.isRequired,
  logoClicked: PropTypes.func.isRequired,
  menuClicked: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  showProjectInfo: PropTypes.bool.isRequired,
}

export default Menu
