import React from 'react';
// @ts-ignore
import ImageGallery from 'react-image-gallery';
import '../App.scss';
import bg0 from '../assets/backgrounds/bg0.jpg';
import bg1 from '../assets/backgrounds/bg1.jpg';
import bg2 from '../assets/backgrounds/bg2.jpg';
import bg3 from '../assets/backgrounds/bg3.jpg';

const MarineGallery = () => {
    const imgs = [
        {
            original: bg0,
        },
        {
            original: bg1,
        },
        {
            original: bg2,
        },
        {
            original: bg3,
        }
    ];

    return (
        <ImageGallery
            items={imgs}
            autoPlay={true}
            showThumbnails={false}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            lazyLoad={true}
            slideInterval={5000}
            additionalClass="background"
        />
    );
}

export default MarineGallery;
