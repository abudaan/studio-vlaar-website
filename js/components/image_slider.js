import React, {Component, PropTypes} from 'react'

const divStyle = {
  WebkitBackgroundSize: 'cover',
  MozbackgroundSize: 'cover',
  ObackgroundSize: 'cover',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
  float: 'left',
}

const sliderStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  transition: '1s',
  left: '0px',
}


export default class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
    this.numProjects = this.props.projects.length
    this.imageFolder = this.props.imageFolder
  }


  render(){
    //console.log(this.props.animStyle)

    let style
    let slides = []
    this.props.projects.forEach((project, i) => {
      let url = `${this.imageFolder}/${project.image}`
      style = {...divStyle, backgroundImage: `url(${url})`, width: this.props.width}
      slides.push(<div key={i} style={style}></div>)
    })

    style = {...sliderStyle, ...this.props.animStyle, width: `${this.props.width * this.numProjects}px`}
    return(
      <div onClick={this.props.sliderClicked} style={style}> {slides} </div>
    )
  }
}

ImageSlider.propTypes = {
  animStyle: PropTypes.object.isRequired,
  imageFolder: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  sliderClicked: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}
