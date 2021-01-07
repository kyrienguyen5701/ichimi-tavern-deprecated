import React from "react";
import './MarineLoadingScreen.scss'
import isMobile from "../utils/device";

const MarineLoadingScreen = () => {
    const loading = isMobile()
        ? require('../assets/loading/loadingPhone.gif').default
        : require('../assets/loading/loadingPC.gif').default
    const loader = isMobile()
        ? 'loader-phone'
        : 'loader-pc'
    return (
        <div className="loader-container">
            <img className={loader} loading="lazy" src={loading} alt={'Loading ...'} />
        </div>
    )
}

export default MarineLoadingScreen;
