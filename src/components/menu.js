import React, {PropTypes} from 'react'
import * as DisplayStates from '../constants/display_states'


function createMultiplySign(){
  return {__html: '&times;'};
}

const Menu = ({type, height, showMenu, logoClicked, menuClicked, hideMenu, displayState, showProjectInfo}) => {

  let menuHeight = 200

  if(type === 'mobile'){
    let logo = document.getElementById('menu_logo_img_mobile')
    if(logo){
      let style = getComputedStyle(logo)
      let h = style.height.replace('px', '')
      let p = style.paddingTop.replace('px', '')
      menuHeight = height - h - p - p
    }
  }

  let animStyle1 = {}
  let animStyle2 = {}
  let duration = '0.5s'


  if(showMenu === true){
    animStyle1 = {
      height: menuHeight + 'px',
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
      top: -menuHeight + 'px',
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

  let menuStyle = {
    height: menuHeight
  }
  let menuItemStyle = {}


  if(type === 'mobile'){
    menuItemStyle = {
      height: (menuHeight - 5) / 8,
      lineHeight: `${(menuHeight - 5) / 8}px`,
    }
    menuStyle = {
      height: menuHeight,
      paddingTop: 5,
    }
  }

  let _logoClicked = () => {
    logoClicked(showMenu)
  }

  menuItems = (
    <div style={menuStyle} id={'menu_items_container'}>
      <div style={menuItemStyle} className={contactClass} id={'contact'} onClick={menuClicked}>{'contact'}</div>
      <div style={menuItemStyle} className={'separator2'} >{'-'}</div>
      <div style={menuItemStyle} className={'menu_link'} id={'pinterest'} onClick={menuClicked}>{'pinterest'}</div>
      <div style={menuItemStyle} className={'separator2'}>{'-'}</div>
      <div style={menuItemStyle} className={'menu_link'} id={'instagram'} onClick={menuClicked}>{'instagram'}</div>
      <div style={menuItemStyle} className={'separator2'}>{'-'}</div>
      <div style={menuItemStyle} className={projectClass} id={'project'} onClick={menuClicked}>{'project'}</div>
      <div className={'separator2'}>{''}</div>
      <div style={menuItemStyle} className={'menu_link close'} onClick={hideMenu} dangerouslySetInnerHTML={createMultiplySign()} />
    </div>
  )

  return (
    <div className={'menu'}>
      <div className={'menu_logo'}>
        <img id={'menu_logo_img_mobile'} src={'./img/logo-mobile.svg'} onClick={_logoClicked}></img>
        <img id={'menu_logo_img_desktop'} src={'./img/logo-desktop.svg'} onClick={_logoClicked}></img>
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
  height: PropTypes.number.isRequired,
  hideMenu: PropTypes.func.isRequired,
  logoClicked: PropTypes.func.isRequired,
  menuClicked: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  showProjectInfo: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
}

export default Menu
