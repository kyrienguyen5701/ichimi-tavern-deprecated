import {getConfig} from "../utils/storage";

const CHANGE_LANG = 'CHANGE_LANG'
const TOGGLE_VIDEO = 'TOGGLE_VIDEO';
const SET_IMAGE_INDEX = 'SET_IMAGE_INDEX';

const initialState = {
    siteLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
    playingNow: false,
    video: '',
    imageIndex: getConfig().imageIndex
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
        default:
            return state
    }
}

export default rootReducer;
