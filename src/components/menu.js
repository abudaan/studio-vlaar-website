import React, {PropTypes} from 'react'


const divStyle = {
}

const Menu = ({showMenu, logoClicked}) => {

  let style = {}
  if(showMenu === true){
    style = {
      top: 0,
      transistion: '1s'
    }
  }else{
    style = {
      top: -200,
      transistion: '1s'
    }
  }

  console.log(showMenu, style)

  return (
    <div className={'menu'} style={divStyle}>
      <img id='logo' src='./img/logo.svg' onClick={logoClicked}></img><br/>
      <div className={'menu_container'}>
        <div style={style} className={'menu_extended'}>
          <div>contact</div>
          <div>-</div>
          <div>pinterest</div>
          <div>-</div>
          <div>project</div>
        </div>
      </div>
    </div>
  )
}


Menu.propTypes = {
}

export default Menu
