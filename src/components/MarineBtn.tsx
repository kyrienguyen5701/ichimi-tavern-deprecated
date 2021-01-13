import {useState} from 'react';
import categoryNames from '../assets/categories.json';
// @ts-ignore
import {useSelector, useDispatch} from 'react-redux';
import {getLang} from '../utils/lang';
import {soundCtrl} from '../utils/player';
import {toggleVideo} from '../redux/reducer';
import MarineBtnData from '../utils/data';
import {getConfig} from '../utils/storage';
import './MarineBtn.scss';
import isMobile from "../utils/device";

export interface MarineBtnState {
    isPlaying: boolean,
    isDisabled: boolean,
}

// class MarineBtn extends React.Component<MarineBtnData, MarineBtnState> {
//     constructor(props: MarineBtnData) {
//         super(props);
//         this.state = {
//             isPlaying: false,
//             isDisabled: false
//         }
//     }
//     // playingNow = useSelector((state: any) => state.playingNow);
//     // hideGallery = useSelector((state: any) => state.hidden);
//     // playingVideo = useSelector((state: any) => state.playingVideo);
//
//     playBtn (callback?: Function) {
//         const dispatch = useDispatch();
//         this.setState({
//             isPlaying: true
//         });
//         dispatch.playingNow();
//         let audio = '../assets/sounds/' + this.props.file;
//         if (this.props.category === 4) {
//             dispatch.toggleVideo(audio);
//             audio += '.mp4';
//         }
//         const ctrl = soundCtrl.play( {
//             isPlaying: true,
//             isDisabled: false
//         }, new Audio(require(audio).default))
//         if (!getConfig().loop) {
//             ctrl.audio.onended = () => {
//                 this.setState({
//                     isPlaying: false
//                 });
//                 dispatch.toggleVideo('');
//                 if (callback) {
//                     callback();
//                 }
//             }
//         }
//         return ctrl;
//     }
//
//     render() {
//         return (
//             <button
//                 className={`btn ${this.state.isPlaying ? "playing" : ""}`}
//                 disabled={this.state.isDisabled}
//                 onClick={() => this.playBtn()}
//             >
//                 {getLang(this.props.name)}
//             </button>
//         );
//     }
// }

const MarineBtn = (props: {
    data: MarineBtnData,
    setImageIndex: Function,
    onRandom: Function,
    onRandomCtg: Function
}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const dispatch = useDispatch();
    const video = useSelector((state: any) => (state.video));
    const random = useSelector((state: any) => (state.random));
    const randomCtg = useSelector((state: any) => (state.randomCtg));

    const playBtn = () => {
        setIsPlaying(true);
        if (video) {
            if (!getConfig().overlap) {
                dispatch(toggleVideo(''));
                props.setImageIndex();
            }
        }
        let sound = props.data.file;
        const ctrl = soundCtrl.play( {
            isPlaying: true,
            isDisabled: false,
        }, new Audio(require('../assets/sounds/' + sound).default)
        , setIsPlaying);
        if (props.data.category === 4 && !isMobile()) {
            dispatch(toggleVideo(sound));
            ctrl.audio.volume = 0;
        }
        if (!getConfig().loop) {
            ctrl.audio.onended = () => {
                setIsPlaying(false);
                if ((!getConfig().overlap && !video) || props.data.category === 4) {
                    dispatch(toggleVideo(''));
                }
                if (random) {
                    props.onRandom();
                }
                if (randomCtg) {
                    props.onRandomCtg(randomCtg);
                }
            }
        }
        return ctrl;
    }

    return (
        <button
            className={`
                btn 
                MarineBtn 
                ${getLang((categoryNames as any)[props.data.category])} 
                ${isPlaying ? "playing" : ""}`
            }
            disabled={isDisabled}
            onClick={() => playBtn()}
        >
            {getLang(props.data.name)}
        </button>
    )
}

export default MarineBtn;
