const d = new Date();
const today = String(d.getUTCDate()) + '/' + String(d.getUTCMonth() + 1);
const common = "discord_server";
const specialDates = {
    cirno: '9/9',
    halloween: '31/10',
    christmas: '25/12'
};
const specialDate = Object.keys(specialDates).find(date => specialDates[date] === today);
const discord_server = specialDate
    ? require(`../assets/media/${common + '_' + specialDate}.gif`).default
    : require(`../assets/media/${common}_default.gif`).default;
export default discord_server;
