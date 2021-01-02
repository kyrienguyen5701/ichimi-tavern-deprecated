import React, {useCallback, useState} from 'react';
import {getLang} from '../utils/lang';
import {soundCtrl} from '../utils/player';
import MarineBtnData from '../utils/data';
import './MarineBtn.scss';

const MarineBtn = (props: MarineBtnData) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playBtn = () => {
        setIsPlaying(true);
        const ctrl = soundCtrl.play(props, new Audio(require('../assets/sounds/' + props.file).default))
        ctrl.audio.onended = () => {
            setIsPlaying(false);
            // if (callback) {
            //     callback(params);
            // }
        }
        return ctrl;
    }

    return (
        <button
            className="btn"
            disabled={props.isDisabled}
            onClick={playBtn}
        >
            {getLang(props.name)}
        </button>
    )
}

export default MarineBtn;
