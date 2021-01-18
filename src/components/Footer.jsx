import github from "../assets/media/github.png";
import youtube from "../assets/media/youtube.png";
import twitter from "../assets/media/twitter.png";
import discord_server from "./MarineDiscordServer";
import aqua_ch from "../assets/channels/aqua_ch.jpg";
import fubuki_ch from "../assets/channels/fubuki_ch.jpg";
import pekora_ch from "../assets/channels/pekora_ch.jpg";

const Footer = () => {
    return (
        <div className="footer">
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
            <div className="contact">
                <a href="https://github.com/kyrienguyen5701/ichimi-tavern#/" target="_blank" rel="noreferrer">
                    <img src={github} alt="Github logo" className="logo" />
                </a>
            </div>
        </div>
    );
}

export default Footer;
