import React, {PropTypes} from 'react'
import * as DisplayStates from '../constants/display_states'


const divStyle = {
}

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
      <div>
        <div id={'contact'} className={'menu_link'} onClick={menuClicked}>contact</div>
        <div>-</div>
        <div id={'pinterest'} className={'menu_link'} onClick={menuClicked}>pinterest</div>
        <div>-</div>
        <div id={'instagram'} className={'menu_link'} onClick={menuClicked}>instagram</div>
        <div>-</div>
        <div id={'project'} className={'menu_link'} onClick={menuClicked}>project</div>
        <br/>
        <div id={'close'} className={'menu_link'} onClick={hideMenu}>x</div>
      </div>
    )
  }else{
    menuItems = (
      <div>
        <div id={'contact'} className={'menu_link'} onClick={menuClicked}>contact</div>
        <div>-</div>
        <div id={'pinterest'} className={'menu_link'} onClick={menuClicked}>pinterest</div>
        <div>-</div>
        <div id={'instagram'} className={'menu_link'} onClick={menuClicked}>instagram</div>
        <div>-</div>
        <div id={'project'} className={'menu_link'} onClick={menuClicked}>project</div>
        <br/>
        <div id={'close'} className={'menu_link'} onClick={hideMenu}>x</div>
      </div>
    )
  }

  return (
    <div className={'menu'}>
      <div className={'menu_logo'} style={divStyle}>
        <img id='logo' src='./img/logo.svg' onClick={logoClicked}></img><br/>
      </div>
      <div style={animStyle1} className={'menu_anim_container'}>
        <div style={animStyle2} className={'menu_collapsed'}>
          {menuItems}
        </div>
      </div>
    </div>
  )
}


Menu.propTypes = {
}

export default Menu
