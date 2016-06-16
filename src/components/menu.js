import React, {PropTypes} from 'react'


const divStyle = {
}

const Menu = ({showMenu, logoClicked, menuClicked}) => {

  let animStyle1 = {}
  let animStyle2 = {}
  let duration = '0.5s'
  let height = 150

  if(showMenu === true){
    animStyle1 = {
      height: height,
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
      top: -height,
      transition: duration
    }
  }

  return (
    <div className={'menu'}>
      <div className={'menu_logo'} style={divStyle}>
        <img id='logo' src='./img/logo.svg' onClick={logoClicked}></img><br/>
      </div>
      <div style={animStyle1} className={'menu_anim_container'}>
        <div style={animStyle2} className={'menu_collapsed'}>
          <div id={'contact'} className={'menu_link'} onClick={menuClicked}>contact</div>
          <div>-</div>
          <div id={'pinterest'} className={'menu_link'} onClick={menuClicked}>pinterest</div>
          <div>-</div>
          <div id={'project'} className={'menu_link'} onClick={menuClicked}>project</div>
        </div>
      </div>
    </div>
  )
}


Menu.propTypes = {
}

export default Menu
