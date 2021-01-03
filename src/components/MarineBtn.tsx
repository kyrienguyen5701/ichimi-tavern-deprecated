import React, {useCallback, useState} from 'react';
import {getLang} from '../utils/lang';
import {soundCtrl} from '../utils/player';
import MarineBtnData from '../utils/data';
import './MarineBtn.scss';
import {getConfig} from "../utils/storage";

export interface MarineBtnState {
    isPlaying: boolean,
    isDisabled: boolean,
}

class MarineBtn extends React.Component<MarineBtnData, MarineBtnState> {
    constructor(props: MarineBtnData) {
        super(props);
        this.state = {
            isPlaying: false,
            isDisabled: false
        }
    }

    playBtn (callback?: Function) {
        this.setState({
            isPlaying: true
        });
        const ctrl = soundCtrl.play( {
            isPlaying: true,
            isDisabled: false
        }, new Audio(require('../assets/sounds/' + this.props.file).default))
        if (!getConfig().loop) {
            ctrl.audio.onended = () => {
                this.setState({
                    isPlaying: false
                });
                if (callback) {
                    callback();
                }
            }
        }
        return ctrl;
    }

    render() {
        return (
            <button
                className={`btn ${this.state.isPlaying ? "playing" : ""}`}
                disabled={this.state.isDisabled}
                onClick={() => this.playBtn()}
            >
                {getLang(this.props.name)}
            </button>
        );
    }
}

// const MarineBtn = (props: MarineBtnData) => {
//
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isDisabled, setIsDisabled] = useState(false);
//
//     const playBtn = () => {
//         setIsPlaying(true);
//         const ctrl = soundCtrl.play( {
//             isPlaying: true,
//             isDisabled: false
//         }, new Audio(require('../assets/sounds/' + props.file).default))
//         if (!getConfig().loop) {
//             ctrl.audio.onended = () => {
//                 setIsPlaying(false);
//                 // if (callback) {
//                 //     callback(params);
//                 // }
//             }
//         }
//         return ctrl;
//     }
//
//     return (
//         <button
//             className="btn"
//             disabled={isDisabled}
//             onClick={playBtn}
//         >
//             {getLang(props.name)}
//         </button>
//     )
// }

export default MarineBtn;
