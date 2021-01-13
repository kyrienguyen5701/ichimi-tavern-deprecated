import {getConfig} from "../utils/storage";

const CHANGE_LANG = 'CHANGE_LANG'
const TOGGLE_VIDEO = 'TOGGLE_VIDEO';
const SET_IMAGE_INDEX = 'SET_IMAGE_INDEX';
const PLAYING_RANDOM = 'PLAYING_RANDOM';
const PLAYING_RANDOM_CTG = 'PLAYING_RANDOM_CTG';

const initialState = {
    siteLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
    playingNow: false,
    video: '',
    imageIndex: getConfig().imageIndex,
    random: false,
    randomCtg: ''
};

export const changeLang = (item) => ({
    type: CHANGE_LANG,
    payload: item
})

export const toggleVideo = (item) => ({
    type: TOGGLE_VIDEO,
    payload: item
})

export const setImageIndex = (item) => ({
    type: SET_IMAGE_INDEX,
    payload: item
})

export const playingRandom = (item) => ({
    type: PLAYING_RANDOM,
    payload: item
})

export const playingRandomCtg = (item) => ({
    type: PLAYING_RANDOM_CTG,
    payload: item
})

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {
                ...state,
                siteLang: action.payload
            }
        case TOGGLE_VIDEO:
            return {
                ...state,
                video: action.payload
            }
        case SET_IMAGE_INDEX:
            return {
                ...state,
                imageIndex: action.payload
            }
        case PLAYING_RANDOM:
            return {
                ...state,
                random: action.payload
            }
        case PLAYING_RANDOM_CTG:
            return {
                ...state,
                randomCtg: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;
