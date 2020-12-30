import MarineBtnData from './data';
import {MarineBtn} from '../components/MarineBtn';

// localStorage.clear();

const defaultStates = {
    loop: '',
    overlap: '',
    bgmVolume: 1
}

if (localStorage.getItem('loop') === null || localStorage.getItem('overlap') === null || localStorage.getItem('bgmVolume') === null) {
    console.log("Bruh again");
    Object.keys(defaultStates).forEach((state: string) => {
        // @ts-ignore
        localStorage.setItem(state, defaultStates[state])
    })
}

const getChecked = (element: HTMLInputElement, ret?: boolean) => {
    if (element) return element.checked;
    return ret ? ret : false;
}

export const getConfig = (saved?: boolean) => {
    let loop = getChecked(document.getElementById('loop') as HTMLInputElement);
    let overlap = getChecked(document.getElementById('overlap') as HTMLInputElement);
    let bgmVolume = Number(localStorage.getItem('bgmVolume'));
    if (saved) {
        loop = Boolean(localStorage.getItem('loop'));
        overlap = Boolean(localStorage.getItem('overlap'));
        bgmVolume = Number(localStorage.getItem('bgmVolume'));
    }
    return {
        loop: loop,
        overlap: overlap,
        bgmVolume: bgmVolume
    }
}

export const setConfig = () => {
    const config = getConfig();
    console.log(config);
    localStorage.setItem('loop', config.loop === true ? 'true' : '');
    localStorage.setItem('overlap', config.overlap === true ? 'true' : '');
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
            audio.play()
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

