export const getLang = (obj: object) : string => {

    let lang = localStorage.getItem('lang');

    if (!lang) {
        lang = 'en';
        localStorage.setItem('lang', lang);
    }

    if (lang in obj) {
        const text = (obj as any)[lang];
        if (text !== '') return text;
    }
    return (obj as any)['en'];
}

export const setLang = (lang: string) => {
    localStorage.setItem('lang', lang);
}

export const langs = () => {
    const r = require.context('../assets/langs', false, /\.json$/)
    const langs: object = {}
    r.keys().forEach((path: string) => {
        (langs as any)[path.slice(2, 4)] = r(path)
    })
    return langs;
};
