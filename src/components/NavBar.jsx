import React, {useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {langs, setLang} from "../utils/lang";
import {changeLang} from "../redux/reducer";

// TODO: Write a disclaimer page and create a gif for the Houshou flag
const NavBar = () => {

    const siteLang = useSelector((state) => state.siteLang);
    const dispatch = useDispatch();

    const set_lang = useCallback((lang) => {
        setLang(lang);
        dispatch(changeLang(lang))
    }, [siteLang]);

    return (
        <div className="nav">
            <div id="badge">
                <img src={require('../assets/houshou_flag.png').default} alt="Houshou flag"/>
            </div>
            <div className="lang-selector">
                <div>{langs()[siteLang].lang[siteLang]}</div>
                <div>
                    {Object.entries(langs()[siteLang].lang).map(([abbv, lang]) => <div key={abbv} className="lang" onClick={() => set_lang(abbv)}>{lang}</div>)}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
