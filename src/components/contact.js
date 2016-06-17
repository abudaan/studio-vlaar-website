import React from 'react'

const Contact = ({contact, hideContact}) => {

  return (
    <div id={'contact_page'}>
      <div id={'contact_content'}>
        <div id={'contact_content_container'}>
          <div className={'contact_item'}>studioVLAAR</div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}>Pascal Vlaar<br/>06 460.414.59</div>
          <div className={'separator'}>{'-'}</div>
          <div className={'contact_item'}><span className={'e-mail'}></span></div>
          <div className={'contact_item close'} onClick={hideContact}>{'x'}</div>
        </div>
      </div>
      <div id={'photo_pascal'}><img src={'./img/pascal2.jpg'}></img></div>
    </div>
  )
}


Contact.propTypes = {
  //hideContact: propTyp
}

export default Contact
