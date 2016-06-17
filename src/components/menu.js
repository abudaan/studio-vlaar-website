import React, {PropTypes} from 'react'
import * as DisplayStates from '../constants/display_states'


const Menu = ({showMenu, logoClicked, menuClicked, hideMenu, displayState}) => {

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

  if(displayState === DisplayStates.CONTACT){
    menuItems = (
      <div id={'menu_items_container'}>
        <div className={'menu_link'} id={'contact'} onClick={menuClicked}>{'contact'}</div>
        <div className={'separator2'} >{'-'}</div>
        <div className={'menu_link'} id={'pinterest'} onClick={menuClicked}>{'pinterest'}</div>
        <div className={'separator2'}>{'-'}</div>
        <div className={'menu_link'} id={'instagram'} onClick={menuClicked}>{'instagram'}</div>
        <div className={'separator2'}>{'-'}</div>
        <div className={'menu_link'} id={'project'} onClick={menuClicked}>{'project'}</div>
        <div className={'menu_link close'} onClick={hideMenu}>{'x'}</div>
      </div>
    )
  }else{
    menuItems = (
      <div id={'menu_items_container'}>
        <div className={'menu_link'} id={'contact'} onClick={menuClicked}>{'contact'}</div>
        <div className={'separator2'}>{'-'}</div>
        <div className={'menu_link'} id={'pinterest'} onClick={menuClicked}>{'pinterest'}</div>
        <div className={'separator2'}>{'-'}</div>
        <div className={'menu_link'} id={'instagram'} onClick={menuClicked}>{'instagram'}</div>
        <div className={'separator2'}>{'-'}</div>
        <div className={'menu_link'} id={'project'} onClick={menuClicked}>{'project'}</div>
        <div className={'menu_link close'} onClick={hideMenu}>{'x'}</div>
      </div>
    )
  }

  return (
    <div className={'menu'}>
      <div className={'menu_logo'}>
        <img id={'logo'} onClick={logoClicked} src={'./img/logo.svg'}></img><br/>
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
  showMenu: PropTypes.bool.isRequired,
  logoClicked: PropTypes.func.isRequired,
  menuClicked: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  displayState: PropTypes.string.isRequired,
}

export default Menu
