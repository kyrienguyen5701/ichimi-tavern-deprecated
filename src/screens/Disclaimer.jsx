import React from "react";
import MarineBackground from "../components/MarineBackground";
import { getConfig } from "../utils/storage";
import { useSelector, useDispatch } from "react-redux";
import { playingRandom, playingRandomCtg, toggleVideo } from "../redux/reducer";

const Disclaimer = () => {
    const imageIndex = useSelector(state => state.imageIndex);
    const dispatch = useDispatch();
    dispatch(toggleVideo(''));
    dispatch(playingRandom(false));
    dispatch(playingRandomCtg(''));
    return (
        <div>
            <MarineBackground
                video={''}
                loop={getConfig().loop}
                disableGallery={getConfig().disableGallery}
                imageIndex={imageIndex}
            />
            <div id="disclaimer-container">
                <div id="disclaimer-header">
                    <h1 id="fansite-name">Houshou no Ichimi Tavern</h1>
                    <h2 id="unofficial">Unofficial Fansite of Houshou Marine</h2>
                    <h2 id="disclaimer">Disclaimer</h2>
                </div>
                <div id="disclaimer-content">
                    <p className="paragraph">
                        <strong>FAN PURPOSES ONLY:</strong> <em>Houshou no Ichimi Tavern Unofficial Fansite</em> is an unofficial, non-profit fansite, made by fans, for fans and is not affiliated in any way with Cover Co., Ltd. or Hololive Production. We are not compensated in any way for any portion of this site, and to the best of <em>Houshou no Ichimi’s Tavern</em> knowledge, all content, images, videos, sounds, photos etc., if any, are being used in compliance with the <a href="https://en.hololive.tv/terms" target="_blank" rel="noreferrer">Fan Work Guidelines</a>.<br /><br />
                        <strong>WE RESPECT THE PRIVACY OF THE CHARACTERS:</strong> We will not share any personal information/pictures/videos which weren't posted by the characters themselves. We will ensure that the information we share on the site will not impair the dignity or goodwill of the characters. We will not publish illegal download links to official content, including concerts, voice packs, audios or videos, and all other merchandise and content, related to the character's work and career.<br /><br />&zwj;
                        <strong>WE DO NOT OWN ANY MEDIA DISPLAYED ON THIS FAN SITE:</strong> Images, audios, and videos published on this fan site are fully owned by their respective authors/owners. We do not claim anything as our own.<br /><br />&zwj;
                        <strong>NO COPYRIGHT INFRIGMENT IS INTENDED:</strong> If you own any content displayed here and want it to be deleted, please, <strong>contact us</strong> immediately.<br /><br />&zwj;
                        <strong>WE STRIVE TO POST ACCURATE INFORMATION:</strong>The information given by this site is for general guidance on matters relating to the characters. Even if <em>Houshou no Ichimi Tavern</em> takes every precaution to ensure that the content is both current and accurate, errors can occur. Additionally, given that the source is mostly in Japanese, there may be delays, omissions, or inaccuracies in the information contained on the site.<em>Houshou no Ichimi Tavern</em> is not responsible for any errors or omissions, or for the results obtained from the use of this information.<br /><br />&zwj;
                        <strong>THE VIEWS EXPRESSED ARE THE AUTHOR'S ALONE:</strong> <em>Houshou no Ichimi Tavern</em> may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including Cover Co., Ltd. or Hololive Production.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Disclaimer;
