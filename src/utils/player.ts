import MarineBtnData from './data';
import MarineBtn from '../components/MarineBtn';
import {getConfig} from "./storage";

// localStorage.clear();

const defaultStates = {
    loop: '',
    overlap: '',
    bgmVolume: 1
}

// export function getRandom(pool: Array<MarineBtn>) {
//     const audio = pool[Math.floor(Math.random() * pool.length)] as typeof MarineBtn;
//     return {
//         audio: audio
//     }
// }

export const soundCtrl = {
    playing: {
        btnData: {} as MarineBtnData,
        audio: new Audio()
    },
    play: function(btnData: MarineBtnData, audio: HTMLAudioElement) {
        if (!getConfig().overlap) {
            if (this.playing) {
                this.playing.btnData.isPlaying = false;
                this.playing.audio.pause();
            }
            this.playing.audio = audio;
            this.playing.btnData = btnData;
            this.playing.audio.play();
        }
        else {
            audio.play();
            return {
                btnData: btnData,
                audio: audio
            }
        }
        if (getConfig().loop) {
            this.playing.audio.onended = () => {
                this.play(btnData, this.playing.audio);
            }
        }
        else {
            this.playing.audio.onended = null
        }
        return this.playing
    }
}

