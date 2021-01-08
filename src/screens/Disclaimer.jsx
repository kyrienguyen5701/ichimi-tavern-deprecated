import React from "react";
import MarineBackground from "../components/MarineBackground";
import {getConfig} from "../utils/storage";
import {useSelector, useDispatch} from "react-redux";
import {toggleVideo} from "../redux/reducer";

const Disclaimer = () => {
    const imageIndex = useSelector(state => state.imageIndex);
    const dispatch = useDispatch();
    dispatch(toggleVideo(''));
    return (
        <div>
            <MarineBackground
                video={''}
                loop={getConfig().loop}
                disableGallery={getConfig().disableGallery}
                imageIndex={imageIndex}
            />
            <p>I'm horny</p>
        </div>
    )
}

export default Disclaimer;
