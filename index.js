import React from 'react';
import PropTypes from 'prop-types';
import './style.less'; 

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideTotal: 0,
            slideCurrent: -1,
            slides: [],
            height: '200px',
        }
        this.timer = this.timer.bind(this);
    }
    componentDidMount() {
        let slides = [];
        this.props.slides.forEach(slide => {
            let slideobject = {
                class:'slider-single proactivede',
                element:slide
            }
            slides.push(slideobject);
        });
        this.setState({
            slides,
            slideTotal: this.props.slides.length - 1,
        });
        // this.slideRight();
        // if(this.state.slideCurrent === -1)
        setTimeout(() => {
            this.slideRight();
        }, 0);
        setInterval(this.timer, 4000);
    }

    onMouseOverImg = () => {
        
        clearInterval(this.timer);
    }

    slideRight() {
        let { slideCurrent, slideTotal } = this.state;
        let preactiveSlide,proactiveSlide;
        if (slideCurrent < slideTotal) {
            slideCurrent++;
        } else {
            slideCurrent=0;
        }
        let slide = this.state.slides;
        if (slideCurrent > 0) {
            preactiveSlide = slide[slideCurrent - 1];
        } else {
            preactiveSlide = slide[slideTotal];
        }
        let activeSlide = slide[slideCurrent];
        if (slideCurrent < slideTotal) {
            proactiveSlide = slide[slideCurrent+1];
        } else {
            proactiveSlide = slide[0];
        }
    
        slide.forEach((slid, index) => {
            if (slid.class.includes('preactivede') ) {
                slid.class = 'slider-single proactivede';
            }
            if (slid.class.includes('preactive')) {
                slid.class = 'slider-single preactivede';
            }
        });
        
        preactiveSlide.class = 'slider-single preactive';
        activeSlide.class = 'slider-single active';
        proactiveSlide.class = 'slider-single proactive';
        this.setState({
            slides: slide,
            slideCurrent
        });

        if (document.getElementsByClassName('slider-single active').length > 0) {
            setTimeout(()=> {
                let height = document.getElementsByClassName('slider-single active')[0].clientHeight;
                this.setState({
                    height: height + 'px'
                })
            }, 500);
        }
        this.props.onClickImage(slideCurrent);
    }
    slideLeft () {
        let {slideCurrent,slideTotal} = this.state;
        let preactiveSlide,proactiveSlide;
        let slide = this.state.slides;
        if (slideCurrent > 0) {
            slideCurrent--;
        } else {
            slideCurrent = slideTotal;
        }
    
        if (slideCurrent < slideTotal) {
            proactiveSlide = slide[slideCurrent + 1];
        } else {
            proactiveSlide = slide[0];
        }
        let activeSlide = slide[slideCurrent];
        if (slideCurrent > 0) {
            preactiveSlide = slide[slideCurrent - 1];
        } else {
            preactiveSlide = slide[slideTotal];
        }
        slide.forEach((slid,index)=> {
            if (slid.class.includes('proactivede') ) {
                slid.class ='slider-single preactivede';
            }
            if (slid.class.includes('proactive')) {
                slid.class = 'slider-single proactivede';
            }
        });
        preactiveSlide.class = 'slider-single preactive';
        activeSlide.class = 'slider-single active';
        proactiveSlide.class = 'slider-single proactive';
        this.setState({
            slides: slide,
            slideCurrent
        });
        if (document.getElementsByClassName('slider-single active').length > 0) {
            setTimeout(()=> {
                let height = document.getElementsByClassName('slider-single active')[0].clientHeight;
                this.setState({
                    height: height+'px'
                });
            }, 500);
        }
        this.props.onClickImage(slideCurrent);
    }
   
    timer() {
        this.slideRight();
    }
    render() {
        return (
            <div className="react-3d-carousel" style={{ height: this.state.height }}>
                {this.state.slides && this.state.slides.length > 0 &&
                    <div className="slider-container">
                        <div className="slider-content">
                            {
                                this.state.slides.map((slider, index)=>{
                                    return (
                                        <div className={slider.class} key={index}>
                                            <div className="slider-left" onMouseEnter={this.onMouseOverImg} onClick={this.slideLeft.bind(this)}>
                                                <div>
                                                    <i className="fa fa-arrow-left" />
                                                </div>
                                            </div>
                                            <div className="slider-right" onMouseEnter={this.onMouseOverImg} onClick={this.slideRight.bind(this)}>
                                                <div >
                                                    <i className="fa fa-arrow-right" />
                                                </div>
                                            </div>
                                            
                                            <div className="slider-single-content">
                                                {slider.element}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                    </div>
                }
            </div>
        );
    }
}
Carousel.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.element)
};
