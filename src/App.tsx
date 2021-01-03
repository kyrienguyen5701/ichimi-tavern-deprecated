import MarineBtn, {MarineBtnState} from './components/MarineBtn';
import categoryName from './assets/categories.json';
import {getLang, setLang} from './utils/lang';
import {getConfig, setConfig} from './utils/storage'
import MarineBtnData from './utils/data'
import './App.scss';
import React, {useCallback, useEffect, useState} from 'react';
import youtube from './assets/media/youtube.png';
import twitter from './assets/media/twitter.png';
import discord_server from './components/MarineDiscordServer';
import aqua_ch from './assets/channels/aqua_ch.jpg';
import fubuki_ch from './assets/channels/fubuki_ch.jpg';
import pekora_ch from './assets/channels/pekora_ch.jpg';
import github from './assets/media/github.png';
import MarineGallery from "./components/MarineGallery";
// @ts-ignore
import original_song from './assets/【original】Ahoy - 我ら宝鐘海賊団☆【ホロライブ-宝鐘マリン】.mp4';

// TODO: Fix non-stop random functions
function App() {

  const [state, setState] = useState({
    siteLang: 'en',
    disableGallery: false,
    imageIndex: 1,
    loop: false,
    overlap: false,
    bgm: new Audio(),
    playingBgm: false,
    playingRandom: false,
    playingRandomCtg: '',
    slideInterval: 4000,
  });

  // get configure from local storage
  useEffect(() => {
    // @ts-ignore
      setState(prevState => {
          return {
              ...prevState,
              disableGallery: localStorage.getItem('disableGallery') ? true : false,
              imageIndex: localStorage.getItem('imageIndex') ? Number(localStorage.getItem('imageIndex')) : 0,
              siteLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
              loop: localStorage.getItem('loop') ? true : false,
              overlap: localStorage.getItem('overlap') ? true : false,
              bgm: new Audio(require('./assets/bgm.mp3').default)
          }
      })
  }, [])

  const buttons= (voices:Array<object>) => {
    return (
        <div className="voices">
            {voices.map((data: any) =>
                <MarineBtn
                    category={data.category}
                    file={data.file}
                    name={data.name}
                    url={data.url}
                />
            )}
        </div>
    )
  }

  const categories = () => {
      const categories: Record<string, Array<object>> = {};
      const getCategoryName = (ctg: string) => {
        return getLang((categoryName as any)[ctg]);
      };
      const r = require.context('./assets/meta/', false, /\.json$/);
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

  const langs = () => {
      const r = require.context('./assets/langs', false, /\.json$/)
      const langs: object = {}
      r.keys().forEach((path: string) => {
        (langs as any)[path.slice(2, 4)] = r(path)
      })
      return langs;
  };

  let current = {
    btnState: {} as MarineBtnState,
    audio: new Audio(),
  };

  const set_lang = useCallback((lang: string) => {
    setLang(lang);
    setState((prevState) => {
      return {
        ...prevState,
        siteLang: lang
      }
    });
  }, [state.siteLang]);

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
    const arr: Array<object> = []
    for (const [k, v] of Object.entries(categories())) {
      // @ts-ignore
      arr.push(...v.map(f => new MarineBtn(f)))
    }
    console.log(arr);
    const selected = arr[Math.floor(Math.random() * arr.length)] as MarineBtn;
    // @ts-ignore
    selected.playBtn(() => {
      if (state.playingRandom) {
        chooseRandom();
      }
    })
  }, [state.playingRandom])

  const playRandom = useCallback(() => {
    setState(prevState => {
        return {
            ...prevState,
            playingRandom: !prevState.playingRandom
        }
    })
  }, [state.playingRandom]);

  useEffect(() => {
      if (state.playingRandom) chooseRandom();
  }, [state.playingRandom])

  const chooseRandomCtg = useCallback((ctgs: Array<Object>, ctg: string) => {
    const selected = new MarineBtn(ctgs[Math.floor(Math.random() * ctgs.length)] as MarineBtnData)
    current = selected.playBtn(() => {
      if (state.playingRandomCtg === ctg) {
        chooseRandomCtg(ctgs, ctg);
      }
    })
  }, [state.playingRandomCtg]);

  const playRandomCtg = useCallback((arr: Array<Object>, ctg: string) => {
    if (state.playingRandomCtg === ctg) {
      current.btnState.isPlaying = false;
      current.audio.pause()
    }
    else chooseRandomCtg(arr, ctg);
    setState(prevState => {
      return {
        ...prevState,
        playingRandomCtg: prevState.playingRandomCtg === ctg ? '' : ctg
      }
    });
  }, [state.playingRandomCtg])

  const navBar = () => {
    return (
        <div className="nav">
          <div className="contact">
            <a href="https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg" target="_blank" rel="noreferrer">
              <img src={youtube} alt="Youtube Logo" className="logo"/>
            </a>
            <a href="https://twitter.com/houshoumarine" target="_blank" rel="noreferrer">
              <img src={twitter} alt="Twitter Logo" className="logo"/>
            </a>
            <a href="https://discord.com/invite/pEA3fzK" target="_blank" rel="noreferrer">
              <img src={discord_server} alt="Discord Server" className="logo circleFrame"/>
            </a>
            <a href="https://aquaminato.moe" className="centered" target="_blank" rel="noreferrer">
              <img src={aqua_ch} alt="Aqua Btn。湊あくあ" className="logo circleFrame"/>
            </a>
            <a href="https://sfubuki.moe" className="centered" target="_blank" rel="noreferrer">
              <img src={fubuki_ch} alt="フブキBtn。白上フブキ" className="logo circleFrame"/>
            </a>
            <a href="https://ntnam11.github.io/pekora-button/" className="centered" target="_blank" rel="noreferrer">
              <img src={pekora_ch} alt={"Pekora Btn. 兎田ぺこら"} className="logo circleFrame" />
            </a>
          </div>
          <div className="lang-selector">
            {/* @ts-ignore */}
            <div>{langs()[state.siteLang].lang[state.siteLang]}</div>
            <div>
              {/* @ts-ignore */}
              {Object.entries(langs()[state.siteLang].lang).map(([abbv, lang]) => <div className="lang" onClick={() => set_lang(abbv)}>{lang}</div>)}
            </div>
          </div>
        </div>
    );
  }

  const background =  () => {
      return (
          <div>
              {/*<video className="background" loop autoPlay>*/}
              {/*    <source src={original_song} type="video/mp4" />*/}
              {/*    <source src={original_song} type="video/ogg" />*/}
              {/*</video>*/}
              <MarineGallery
                  autoPlay={!state.disableGallery}
                  slideInterval={state.slideInterval}
                  imageIndex={state.imageIndex}
              />
          </div>
      )
  }

  const controller = () => {
    return (
        <div className="controller">
          <div>
            <button
                className="btn"
                onClick={chooseRandom}
                disabled={state.playingRandom || state.playingRandomCtg !== ""}
            >
              {/* @ts-ignore */}
              {langs()[state.siteLang].action.random}
            </button>
            <button
                className="btn"
                onClick={playRandom}
                disabled={state.playingRandomCtg !== ""}
            >
              {/* @ts-ignore */}
              {state.playingRandom ? langs()[state.siteLang].action.stop : langs()[state.siteLang].action.nonstop}
            </button>
            <div>
              <label className="checkbox-container">
                {/* @ts-ignore */}
                No gallery
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
                {langs()[state.siteLang].action.loop}
                <input
                    type="checkbox"
                    checked={state.loop}
                    disabled={state.playingRandom}
                    name="loop" id="loop"
                    onChange={toggleLoop}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              {/* @ts-ignore */}
              <label className="checkbox-container">{langs()[state.siteLang].action.overlap}
                <input
                    type="checkbox"
                    checked={state.overlap}
                    disabled={state.playingRandom}
                    name="overlap" id="overlap"
                    onChange={toggleOverlap}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div>
              {/* @ts-ignore */}
              <label className="checkbox-container">{langs()[state.siteLang].action.bgm}
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
                {langs()[state.siteLang].action.volume}
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

  const contents = () => {
    return (
        <div>
          {
            Object.entries(categories()).map(([ctg, voices]) =>
                <div className="group">
                    <div className="group-header">
                      <h4>{ctg}</h4>
                      <button
                          className="btn"
                          onClick={() => playRandomCtg(categories()[ctg], ctg)}
                          disabled={state.playingRandom || (state.playingRandomCtg !== '' && state.playingRandomCtg !== ctg)}
                      >
                        {/* @ts-ignore */}
                        {state.playingRandomCtg === ctg ? langs()[state.siteLang].action.stop : langs()[state.siteLang].action.nonstop}
                      </button>
                    </div>
                    {buttons(voices)}
                </div>
            )
          }
        </div>
    );
  }

  const footer = () => {
    return (
        <div className="footer">
          <a href="https://github.com/kyrienguyen5701/marine-button" target="_blank" rel="noreferrer">
            <img src={github} alt="Github logo" className="logo" />
          </a>
          {/* @ts-ignore */}
          <p>{langs()[state.siteLang].text['term']}</p>
        </div>
    );
  }

  return (
      <div id="app">
          {navBar()}
          {background()}
          {controller()}
          {contents()}
          {footer()}
      </div>
  )
}

export default App;
