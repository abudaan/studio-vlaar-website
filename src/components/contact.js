import React, {PropTypes}from 'react'


function createCharArray(){
  let email = ''
  let result = []
  for(let i = 0; i < email.length; i++){
    let char = email.charCodeAt(i)
    result.push(char)
  }
  console.log(result)
}

function createEmail(){
  let email = [112, 97, 115, 99, 97, 108, 64, 115, 116, 117, 100, 105, 111, 118, 108, 97, 97, 114, 46, 110, 108]
  return String.fromCharCode(...email)
}

const Contact = ({hideContact}) => {

  return (
    <div id={'contact_page'}>
      <div id={'contact_content'}>
        <div id={'contact_content_container'}>
          <div className={'contact_item'}>studioVLAAR</div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}>Pascal Vlaar<br/>06 460.414.59</div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}><span>{createEmail()}</span></div>
          <div className={'contact_item close'} onClick={hideContact}>{'x'}</div>
        </div>
      </div>
      <div id={'photo_pascal'}><img src={'./img/pascal2.jpg'}></img></div>
    </div>
  )
}


Contact.propTypes = {
  //contact: PropTypes.object.isRequired
  hideContact: PropTypes.func.isRequired
}

export default Contact
