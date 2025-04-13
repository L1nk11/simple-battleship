import github from '../assets/github.svg';
import moon from '../assets/moon.svg';
import restart from '../assets/rotate.svg';
import sun from '../assets/sun.svg';

async function loadLightIcon() {
    const response = await fetch(sun);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const icon = doc.querySelector('svg');

    icon.id = 'light-icon';
    icon.removeAttribute('width');
    icon.removeAttribute('height');
    icon.setAttribute('fill', 'currentColor')

    return icon;
}

async function loadRestartIcon() {
    const response = await fetch(restart);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const icon = doc.querySelector('svg');

    icon.id = 'restart-icon';
    icon.removeAttribute('width');
    icon.removeAttribute('height');

    return icon;
}

async function loadDarkIcon() {
    const response = await fetch(moon);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const icon = doc.querySelector('svg');

    icon.id = 'dark-icon';
    icon.removeAttribute('width');
    icon.removeAttribute('height');
    icon.setAttribute('fill', 'currentColor')

    return icon;
}

async function loadGitIcon() {
    const response = await fetch(github);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const icon = doc.querySelector('svg');

    icon.id = 'git-icon';
    icon.removeAttribute('width');
    icon.removeAttribute('height');
    icon.setAttribute('fill', 'currentColor')

    return icon;
}

export {loadDarkIcon, loadLightIcon, loadGitIcon, loadRestartIcon};