import React, {Component, PropTypes} from 'react'

const divStyle = {
  WebkitBackgroundSize: 'cover',
  MozbackgroundSize: 'cover',
  ObackgroundSize: 'cover',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  height: '100%',
  width: '100%',
  float: 'left',
}

const sliderStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
}


export default class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
    this.numProjects = this.props.projects.length
    this.imageFolder = this.props.imageFolder
  }


  render(){

    let url
    let style
    let slides = []
    let sliderAnimStyle = {
      left: -this.props.index * this.props.width,
      transition: '0.7s'
    }

    //console.log(this.props.size)
    this.props.projects.forEach((project, i) => {
      if(this.props.size <= 1024){
        url = `${this.imageFolder}/${project.image.small}`
      }else{
        url = `${this.imageFolder}/${project.image.large}`
      }
      style = {...divStyle, backgroundImage: `url(${url})`, width: this.props.width}
      slides.push(<div key={i} style={style}></div>)
    })

    style = {...sliderStyle, ...sliderAnimStyle, width: `${this.props.width * this.numProjects}px`}

    if(this.props.touchEnabled === true){
      return <div style={style}> {slides} </div>
    }
    return <div onClick={this.props.sliderClicked} style={style}> {slides} </div>

  }
}

ImageSlider.propTypes = {
  imageFolder: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.number.isRequired,
  sliderClicked: PropTypes.func.isRequired,
  touchEnabled: PropTypes.bool,
  width: PropTypes.number.isRequired,
}
