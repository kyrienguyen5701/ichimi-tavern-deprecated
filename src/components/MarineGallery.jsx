import React, {useEffect, useRef} from 'react';
import ImageGallery from 'react-image-gallery';
import './MarineGallery.scss';

const MarineGallery = (props) => {

    let _gallery = useRef(null);

    useEffect(() => {
        if (props.autoPlay) _gallery.play();
        else _gallery.pause();
    })

    const isMobile = () => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        return isAndroid || isiOS;
    }

    const images = [];
    if (!isMobile()) {
        const r = require.context('../assets/pcBackgrounds/', false, /\.jpg|\.jpg$/);
        r.keys().forEach((path) => {
            images.push({original: r(path).default});
        })
    }
    else {
        const r = require.context('../assets/phoneBackgrounds/', false, /\.jpg|\.png$/);
        r.keys().forEach((path) => {
            images.push({original: r(path).default});
        })
    }

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
            slideInterval={props.slideInterval}
            startIndex={props.imageIndex}
            onSlide={(index) => localStorage.setItem('imageIndex', String(index))}
            additionalClass="background"
        />
    )
}

export default MarineGallery;
