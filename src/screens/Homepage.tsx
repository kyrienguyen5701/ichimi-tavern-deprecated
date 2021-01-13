import MarineBtn, {MarineBtnState} from '../components/MarineBtn';
import categoryNames from '../assets/categories.json';
import {getLang, langs} from '../utils/lang';
import {getConfig, setConfig} from '../utils/storage'
import MarineBtnData from '../utils/data';
import React, {useCallback, useEffect, useState} from 'react';
// @ts-ignore
import {useSelector, useDispatch} from 'react-redux';
import MarineBackground from "../components/MarineBackground";
import { playingRandom, playingRandomCtg } from '../redux/reducer';

// TODO: Fix non-stop random functions
const Homepage = () => {

    const [state, setState] = useState({
        disableGallery: false,
        imageIndex: 0,
        loop: false,
        overlap: false,
        bgm: new Audio(),
        playingBgm: false,
    });

    // overall app state
    const siteLang = useSelector((state: any) => state.siteLang);
    const imgIndex = useSelector((state: any) => state.imageIndex);
    const video = useSelector((state: any) => state.video);
    const random = useSelector((state: any) => state.random);
    const randomCtg = useSelector((state: any) => state.randomCtg);
    const dispatch = useDispatch();

    // get configure from local storage
    useEffect(() => {
        // @ts-ignore
        setState(prevState => {
            return {
                ...prevState,
                disableGallery: !!localStorage.getItem('disableGallery'),
                imageIndex: localStorage.getItem('imageIndex') ? Number(localStorage.getItem('imageIndex')) : 0,
                loop: !!localStorage.getItem('loop'),
                overlap: !!localStorage.getItem('overlap'),
                bgm: new Audio(require('../assets/bgm.mp3').default)
            }
        })
    }, [])

    const buttons = (voices:Array<MarineBtnData>) => {
        return (
            <div className="voices">
                {voices.map((data: MarineBtnData) =>
                    <MarineBtn
                        data={data}
                        setImageIndex={setImageIndex}
                        onRandom={chooseRandom}
                        onRandomCtg={chooseRandomCtg}
                    />
                )}
            </div>
        )
    }

    const categories = () => {
        const categories: Record<string, Array<MarineBtnData>> = {};
        const getCategoryName = (ctg: string) => {
            return getLang((categoryNames as any)[ctg]);
        };
        const r = require.context('../assets/meta/', false, /\.json$/);
        r.keys().forEach((path: string) => {
            const data = r(path);
            data.isPlaying = false;
            const ctg = getCategoryName(data.category)
            if (Object.prototype.hasOwnProperty.call(categories, ctg)) {
                categories[ctg].push(data);
            }
            else {
                categories[ctg] = [data];
            }
        })
        return categories;
    }

    let current = {
        btnState: {} as MarineBtnState,
        audio: new Audio(),
    };

    const toggleGallery = useCallback(() => {
        setConfig();
        setState((prevState => {
            return {
                ...prevState,
                disableGallery: !prevState.disableGallery,
                imageIndex: Number(localStorage.getItem('imageIndex'))
            }
        }))
    }, [state.disableGallery])

    const setImageIndex = useCallback(() => {
        setConfig();
        setState((prevState => {
            return {
                ...prevState,
                imageIndex: imgIndex
            }
        }))
    } , [imgIndex])

    const toggleLoop = useCallback(() => {
        setConfig();
        setState((prevState => {
            return {
                ...prevState,
                loop: !prevState.loop
            }
        }))
    }, [state.loop]);

    const toggleOverlap = useCallback(() => {
        setConfig();
        setState((prevState => {
            return {
                ...prevState,
                overlap: !prevState.overlap
            }
        }))
    }, [state.overlap]);

    const toggleBgm = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                playingBgm: !prevState.playingBgm
            }
        })
    }, [state.playingBgm])

    useEffect(() => {
        if (!state.playingBgm) {
            state.bgm.onended = null;
            state.bgm.pause();
        }
        else {
            state.bgm.volume = getConfig().bgmVolume;
            state.bgm.play();
            state.bgm.onended = () => {
                if (state.playingBgm) state.bgm.play();
            }
        }
    }, [state.bgm, state.playingBgm])

    const bgmVolumeChange = useCallback(() => {
        const value = Number((document.getElementById('bgmVolume') as HTMLInputElement).value) / 100;
        localStorage.setItem('bgmVolume', String(value));
        state.bgm.volume = value;
        setState(prevState => {
            return({
                ...prevState,
                bgm: prevState.bgm
            })
        })
    }, [state.bgm])

    const chooseRandom = useCallback(() => {
      const pool = document.getElementsByClassName('MarineBtn');
      const selected = pool[Math.floor(Math.random() * pool.length)] as any;
      selected.click();
    }, [])

    const playRandom = useCallback(() => {
      dispatch(playingRandom(!random));
    }, [random]);
    
    useEffect(() => {
        if (random) chooseRandom();
    }, [random])

    const chooseRandomCtg = useCallback((ctg: string) => {
        const pool = document.getElementsByClassName(ctg);
        const selected = pool[Math.floor(Math.random() * pool.length)] as any;
        selected.click();
      }, [randomCtg])
  
    const playRandomCtg = useCallback((ctg: string) => {
        dispatch(playingRandomCtg(randomCtg ? '' : ctg));
    }, [randomCtg]);
      
    useEffect(() => {
        if (randomCtg) chooseRandomCtg(randomCtg);
    }, [randomCtg])

    const Controller = () => {
        return (
            <div className="controller">
                <div>
                    <button
                        className="btn"
                        onClick={chooseRandom}
                        disabled={random || randomCtg !== ""}
                    >
                        {/* @ts-ignore */}
                        {langs()[siteLang].action.random}
                    </button>
                    <button
                        className="btn"
                        onClick={playRandom}
                        disabled={randomCtg !== ""}
                    >
                        {/* @ts-ignore */}
                        {random ? langs()[siteLang].action.stop : langs()[siteLang].action.nonstop}
                    </button>
                    <div>
                        <label className="checkbox-container">
                            {/* @ts-ignore */}
                            {langs()[siteLang].action.noGallery}
                            <input
                                type="checkbox"
                                checked={state.disableGallery}
                                name="disable-gallery" id="disable-gallery"
                                onChange={toggleGallery}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        <label className="checkbox-container">
                            {/* @ts-ignore */}
                            {langs()[siteLang].action.loop}
                            <input
                                type="checkbox"
                                checked={state.loop}
                                disabled={random}
                                name="loop" id="loop"
                                onChange={toggleLoop}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        {/* @ts-ignore */}
                        <label className="checkbox-container">{langs()[siteLang].action.overlap}
                            <input
                                type="checkbox"
                                checked={state.overlap}
                                disabled={random}
                                name="overlap" id="overlap"
                                onChange={toggleOverlap}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        {/* @ts-ignore */}
                        <label className="checkbox-container">{langs()[siteLang].action.bgm}
                            <input
                                type="checkbox"
                                checked={state.playingBgm}
                                name="bgm" id="bgm"
                                onChange={toggleBgm}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div hidden={!state.playingBgm}>
                        <label className="slider-container">
                            {/* @ts-ignore */}
                            {langs()[siteLang].action.volume}
                            <input
                                type="range" min="1" max="100"
                                className="slider" id="bgmVolume"
                                value={getConfig(true).bgmVolume * 100}
                                onChange={bgmVolumeChange}
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    const Contents = () => {
        return (
            <div>
                {
                    Object.entries(categories()).map(([ctg, voices]) =>
                        <div className="group">
                            <div className="group-header">
                                <h4>{ctg}</h4>
                                <button
                                    className="btn"
                                    onClick={() => playRandomCtg(ctg)}
                                    disabled={random || (randomCtg !== '' && randomCtg !== ctg)}
                                >
                                    {/* @ts-ignore */}
                                    {randomCtg === ctg ? langs()[siteLang].action.stop : langs()[siteLang].action.nonstop}
                                </button>
                            </div>
                            {buttons(voices)}
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div>
            <MarineBackground
                video={video}
                loop={state.loop}
                disableGallery={state.disableGallery}
                imageIndex={state.imageIndex}
            />
            {Controller()}
            {Contents()}
        </div>
    )
}

export default Homepage;
