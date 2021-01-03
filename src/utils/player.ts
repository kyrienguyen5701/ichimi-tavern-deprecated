import MarineBtn, {MarineBtnState} from '../components/MarineBtn';
import {getConfig} from "./storage";

export function getRandom(pool: Array<object>) {
    const audio = pool[Math.floor(Math.random() * pool.length)] as MarineBtn;
    return {
        audio: audio
    }
}

export const soundCtrl = {
    playing: {
        btnState: {} as MarineBtnState,
        audio: new Audio()
    },
    play: function(btnState: MarineBtnState, audio: HTMLAudioElement) {
        if (!getConfig().overlap) {
            if (this.playing) {
                // this.playing.btnState.isPlaying = false;
                this.playing.audio.pause();
            }
            this.playing.audio = audio;
            this.playing.btnState = btnState;
            this.playing.audio.play();
        }
        else {
            audio.play();
            return {
                btnState: btnState,
                audio: audio
            }
        }
        if (getConfig().loop) {
            this.playing.audio.onended = () => {
                this.play(btnState, this.playing.audio);
            }
        }
        else {
            this.playing.audio.onended = null
        }
        return this.playing
    }
}

