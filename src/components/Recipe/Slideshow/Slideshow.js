import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Slideshow = ({ imgs }) => {
    return (
        <Slide easing="ease">
            { imgs.map(({ url }, index) => (
                <div className="each-slide" key={index}>
                    <div style={{'backgroundImage': `url(${url})`}}>
                    </div>
                </div>
            )) }
        </Slide>
    )
};

export default Slideshow;
