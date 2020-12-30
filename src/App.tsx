import {MarineBtn, playBtn} from './components/MarineBtn';
import categoryName from './assets/categories.json';
import {getLang, setLang} from './utils/lang';
import {getConfig, setConfig} from './utils/player'
import MarineBtnData from './utils/data'
import './App.scss';
import React, {useCallback, useEffect, useState} from 'react';
import background from './assets/background.jpg'
import youtube from './assets/youtube.png';
import twitter from './assets/twitter.png';
import aqua_ch from './assets/channels/aqua_ch.jpg';
import fubuki_ch from './assets/channels/fubuki_ch.jpg';
import pekora_ch from './assets/channels/pekora_ch.jpg';
import github from './assets/github.png';
import MarineGallery from "./components/MarineGallery";
// @ts-ignore
import original_song from './assets/【original】Ahoy - 我ら宝鐘海賊団☆【ホロライブ-宝鐘マリン】.mp4';


// TODO: Fix playing functions
function App() {

  const [state, setState] = useState({
    siteLang: 'en',
    loop: false,
    overlap: false,
    playingBgm: false,
    playingRandom: false,
    playingRandomCtg: '',
  });

  console.log(state);

  useEffect(() => {
    // @ts-ignore
      setState(prevState => {
          return {
              ...prevState,
              siteLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
              loop: localStorage.getItem('loop') ? true : false,
              overlap: localStorage.getItem('overlap') ? true : false
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
                    isPlaying={false}
                    isDisabled={false}
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

  const bgm = new Audio(require('./assets/bgm.mp3').default);

  let playing = {
    btnData: {} as MarineBtnData,
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
    }, [state.loop]);

  const toggleBgm = useCallback(() => {
    setState((prevState) => {
        return {
            ...prevState,
            playingBgm: !prevState.playingBgm
        }
    })
  }, [state.playingBgm])

    useEffect(() => {
        console.log('bgm')
        if (!state.playingBgm) {
            bgm.onended = null;
            bgm.pause();
            console.log('Bruh')
        }
        else {
            bgm.volume = getConfig().bgmVolume;
            bgm.play();
            bgm.onended = () => {
                if (state.playingBgm) bgm.play()
            }
        }
    }, [bgm, state.playingBgm])

  const bgmVolumeChange = () => {
    const value = Number((document.getElementById('bgmVolume') as HTMLInputElement).value) / 100;
    bgm.volume = value;
    localStorage.setItem('bgmVolume', String(value));
  }

  // const chooseRandom = useCallback(() => {
  //   const arr: Array<object> = []
  //   for (const [k, v] of Object.entries(categories)) {
  //     arr.push(...v.map(f => {
  //       const btn = MarineBtn(f);
  //       return btn;
  //     }))
  //   }
  //   const selected = arr[Math.floor(Math.random() * arr.length)] as typeof MarineBtn;
  //   selected.playBtn(() => {
  //     if (state.playingRandom) {
  //       chooseRandom()
  //     }
  //   })
  // }, [state.playingRandom])
  //
  // const playRandom = useCallback(() => {
  //   // TODO: write chooseRandom()
  //   if (state.playingRandom) playing.audio.pause();
  //   else chooseRandom();
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       playingRandomCtg: null,
  //       playingRandom: !prevState.playingRandom,
  //     }
  //   });
  // }, [state.playingRandom]);

  // const chooseRandomCtg = useCallback((ctgs: Array<Object>, ctg: string) => {
  //   const selected = MarineBtn(ctgs[Math.floor(Math.random() * ctgs.length)] as MarineBtnData)
  //   playing = playBtn((selected) => {
  //     if (state.playingRandomCtg === ctg) {
  //       chooseRandomCtg(ctgs, ctg);
  //     }
  //   })
  // }, [state.playingRandomCtg]);

  // const playRandomCtg = useCallback((arr: Array<Object>, ctg: string) => {
  //   // TODO: fix chooseRandomCtg
  //   if (state.playingRandomCtg === ctg) {
  //     playing.btnData.isPlaying = false;
  //     playing.audio.pause()
  //   }
  //   else chooseRandomCtg(arr, ctg);
  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       playingRandomCtg: prevState.playingRandomCtg === ctg ? null : ctg
  //     }
  //   });
  // }, [state.playingRandomCtg])

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

  const controller = () => {
    return (
        <div className="controller">
          <div>
            <button
                className="btn"
                // onClick={chooseRandom}
                disabled={state.playingRandom || state.playingRandomCtg !== ""}
            >
              {/* @ts-ignore */}
              {langs()[state.siteLang].action.random}
            </button>
            <button
                className="btn"
                // onClick={playRandom}
                disabled={state.playingRandomCtg !== ""}
            >
              {/* @ts-ignore */}
              {state.playingRandom ? langs()[state.siteLang].action.stop : langs()[state.siteLang].action.nonstop}
            </button>
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
                          // onClick={() => playRandomCtg(categories[ctg], ctg)}
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
          {/*<video className="background" loop autoPlay>*/}
          {/*    <source src={original_song} type="video/mp4" />*/}
          {/*    <source src={original_song} type="video/ogg" />*/}
          {/*</video>*/}
          <MarineGallery />
          {controller()}
          {contents()}
          {footer()}
      </div>
  )
}

export default App;
