const defaultStates = {
    disableGallery: '',
    imageIndex: 0,
    loop: '',
    overlap: '',
    bgmVolume: 1,
}

if (localStorage.getItem('disableGallery') === null ||
    localStorage.getItem('imageIndex') === null ||
    localStorage.getItem('loop') === null ||
    localStorage.getItem('overlap') === null ||
    localStorage.getItem('bgmVolume' ) === null) {
    Object.keys(defaultStates).forEach((state: string) => {
        // @ts-ignore
        localStorage.setItem(state, defaultStates[state])
    })
}

const getChecked = (element: HTMLInputElement, ret?: boolean) => {
    if (element) return element.checked;
    return ret ? ret : false;
}

export const getConfig = (saved?: boolean) => {
    let disableGallery = getChecked(document.getElementById('disable-gallery') as HTMLInputElement);
    let imageIndex = Number(localStorage.getItem('imageIndex'));
    let loop = getChecked(document.getElementById('loop') as HTMLInputElement);
    let overlap = getChecked(document.getElementById('overlap') as HTMLInputElement);
    let bgmVolume = Number(localStorage.getItem('bgmVolume'));
    if (saved) {
        disableGallery = Boolean(localStorage.getItem('disableGallery'))
        loop = Boolean(localStorage.getItem('loop'));
        overlap = Boolean(localStorage.getItem('overlap'));
    }
    return {
        disableGallery: disableGallery,
        imageIndex: imageIndex,
        loop: loop,
        overlap: overlap,
        bgmVolume: bgmVolume
    }
}

export const setConfig = () => {
    const config = getConfig();
    localStorage.setItem('disableGallery', config.disableGallery === true ? 'true' : '');
    localStorage.setItem('imageIndex', String(config.imageIndex));
    localStorage.setItem('loop', config.loop === true ? 'true' : '');
    localStorage.setItem('overlap', config.overlap === true ? 'true' : '');
}
