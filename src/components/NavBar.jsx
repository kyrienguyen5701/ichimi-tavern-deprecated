import React, {useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {langs, setLang} from "../utils/lang";
import {changeLang} from "../redux/reducer";
import Homepage from "../screens/Homepage";
import Disclaimer from "../screens/Disclaimer";

// TODO: Create a gif for the Houshou flag
const NavBar = () => {

    const siteLang = useSelector((state) => state.siteLang);
    const dispatch = useDispatch();

    const set_lang = useCallback((lang) => {
        setLang(lang);
        dispatch(changeLang(lang))
    }, [siteLang]);

    return (
        <Router>
            <div className="nav">
                <div className="nav-left">
                    <Link to="/">
                        <img src={require('../assets/houshou_flag.png').default} alt="Houshou flag" className="logo"/>
                    </Link>
                </div>
                <div className="nav-right">
                    <Link to="/disclaimer">
                        <div>Disclaimer</div>
                    </Link>
                    <div className="lang-selector">
                        <div>{langs()[siteLang].lang[siteLang]}</div>
                        <div>
                            {Object.entries(langs()[siteLang].lang).map(([abbv, lang]) => <div key={abbv} className="lang" onClick={() => set_lang(abbv)}>{lang}</div>)}
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/disclaimer">
                    <Disclaimer />
                </Route>
            </Switch>
        </Router>

    );
}

export default NavBar;