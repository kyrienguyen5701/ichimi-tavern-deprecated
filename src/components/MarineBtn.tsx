import React from 'react';
import {getLang} from '../utils/lang';
import {soundCtrl} from '../utils/player';
import MarineBtnData from '../utils/data';
import './MarineBtn.scss'

const playBtn = (props: MarineBtnData, callback?: Function, params?: Array<Object>) => {
    props.isPlaying = true;
    const ctrl = soundCtrl.play(props, new Audio(require('../assets/sounds/' + props.file)))
    ctrl.audio.onended = () => {
        props.isPlaying = false;
        if (callback) {
            callback(params);
        }
    }
    return ctrl;
}

const MarineBtn = (props: MarineBtnData) => {
    return (
        <button
            className="btn"
            disabled={props.isDisabled}
            onClick={() => playBtn}
        >
            {getLang(props.name)}
        </button>
    )
}

export {
    MarineBtn,
    playBtn
};
