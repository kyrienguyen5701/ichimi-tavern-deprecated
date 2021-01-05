const isMobile = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPod/i.test(navigator.userAgent);
    return isAndroid || isiOS;
}

export default isMobile;
