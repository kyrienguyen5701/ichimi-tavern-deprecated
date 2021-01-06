import {MarineBtnState} from '../components/MarineBtn';
import {getConfig} from "./storage";

export const soundCtrl = {
    playing: {
        btnState: {} as MarineBtnState,
        setIsPlaying: '' as any,
        audio: new Audio()
    },
    play: function(btnState: MarineBtnState, audio: HTMLAudioElement, setIsPlaying: Function) {
        if (!getConfig().overlap) {
            if (this.playing && this.playing.setIsPlaying) {
                this.playing.setIsPlaying(false);
                this.playing.audio.pause();
            }
            this.playing.audio = audio;
            this.playing.btnState = btnState;
            this.playing.setIsPlaying = setIsPlaying;
            this.playing.audio.play();
        }
        else {
            audio.play();
            this.playing.audio = audio;
            this.playing.btnState = btnState;
            this.playing.setIsPlaying = setIsPlaying;
        }
        if (getConfig().loop) {
            this.playing.audio.onended = () => {
                this.play(btnState, this.playing.audio, setIsPlaying);
            }
        }
        else {
            this.playing.audio.onended = null
        }
        return this.playing
    }
}
