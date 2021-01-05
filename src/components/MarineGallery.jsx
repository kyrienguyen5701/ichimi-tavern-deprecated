import React, {useEffect, useRef} from 'react';
import ImageGallery from 'react-image-gallery';
import './MarineGallery.scss';
import isMobile from "../utils/device";
import {useDispatch} from "react-redux";
import {setImageIndex} from "../redux/reducer";

const MarineGallery = (props) => {

    let _gallery = useRef(null);

    useEffect(() => {
        if (props.autoPlay) _gallery.play();
        else _gallery.pause();
    })

    const images = [];
    if (!isMobile()) {
        const r = require.context('../assets/pcBackgrounds/', false, /\.jpg$/);
        r.keys().forEach((path) => {
            images.push({original: r(path).default});
        })
    }
    else {
        const r = require.context('../assets/phoneBackgrounds/', false, /\.jpg$/);
        r.keys().forEach((path) => {
            images.push({original: r(path).default});
        })
    }

    const dispatch = useDispatch();

    return (
        <ImageGallery
            ref={i => _gallery = i}
            items={images}
            autoPlay={props.autoPlay}
            showThumbnails={false}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            lazyLoad={true}
            slideInterval={4000}
            startIndex={props.imageIndex}
            onSlide={(index) => {
                localStorage.setItem('imageIndex', String(index));
                dispatch(setImageIndex(index));
            }}
            additionalClass="background"
        />
    )
}

export default MarineGallery;
