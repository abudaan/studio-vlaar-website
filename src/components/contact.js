import React, {PropTypes}from 'react'


// pascal@studiovlaar.nl [112, 97, 115, 99, 97, 108, 64, 115, 116, 117, 100, 105, 111, 118, 108, 97, 97, 114, 46, 110, 108]

function createMultiplySign(){
  return {__html: '&times;'};
}

function createCharArray(){
  let email = 'pascal at studiovlaar.nl'
  let result = []
  for(let i = 0; i < email.length; i++){
    let char = email.charCodeAt(i)
    result.push(char)
  }
  console.log(result)
}

//createCharArray()

function createEmail(){
  let email = [112, 97, 115, 99, 97, 108, 64, 115, 116, 117, 100, 105, 111, 118, 108, 97, 97, 114, 46, 110, 108]
  return String.fromCharCode(...email)
}

const emailLink = String.fromCharCode(...[115, 116, 117, 100, 105, 111, 118, 108, 97, 97, 114, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109])
const emailLabel = String.fromCharCode(...[112, 97, 115, 99, 97, 108, 32, 97, 116, 32, 115, 116, 117, 100, 105, 111, 118, 108, 97, 97, 114, 46, 110, 108])

const Contact = ({type, width, height, hideContact}) => {
  let style = {
    height,
  }
  let menuWidth = type === 'desktop' ? 300 : 190
  let stylePhoto = {
    width: (width - menuWidth) * 0.45,
  }
  let styleContent = {
    width: (width - menuWidth) * 0.55,
  }
  return (
    <div style={style} id={'contact_page'}>
      <div style={styleContent} id={'contact_content'}>
        <div id={'contact_content_container'}>
          <div className={'contact_item'}>{'studioVLAAR'}</div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}>{'Pascal Vlaar'}<br/><a href={'tel:+31646041459'}>{'06 460.414.59'}</a></div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}><span><a href={`mailto:${emailLink}`}>{emailLabel}</a></span></div>
          <div className={'contact_item close'} onClick={hideContact} dangerouslySetInnerHTML={createMultiplySign()} />
        </div>
      </div>
      <div style={stylePhoto} id={'photo_pascal'}><img src={'./img/pascal2.jpg'}></img></div>
    </div>
  )
}


Contact.propTypes = {
  //contact: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideContact: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

export default Contact
