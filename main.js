const playlist = [
    {
        name: 'Everithing in its right place',
        group: 'Radiohead',
        cover: '/audio-player/assets/img/cover-1.jpg',
        source: '/audio-player/assets/audio/Radiohead - Everything In Its Right Place.mp3'
    },
    {
        name: 'Optimistic',
        group: 'Radiohead',
        cover: '/audio-player/assets/img/cover-2.jpg',
        source: '/audio-player/assets/audio/Radiohead - Optimistic.mp3'
    },
    {
        name: 'The national anthem',
        group: 'Radiohead',
        cover: '/audio-player/assets/img/cover-3.jpg',
        source: '/audio-player/assets/audio/Radiohead - The National Anthem.mp3'
    }
]
const song = document.getElementById('song');
const progressBar = document.getElementById('progress-bar');
const playPauseBtn = document.getElementById('btn-play-pause');
const playBackward = document.getElementById('btn-backward');
const playForward = document.getElementById('btn-forward');
const img = playPauseBtn.querySelector('img');
const currentTime = document.getElementById('current');
const endTime = document.getElementById('end');
let isPlay = false;
//Format duration time
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
//Set progress bar values and duration time
song.onloadedmetadata = () => {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    endTime.textContent = formatTime(song.duration);
};
//Play-Pause function
let time;
const playPause = (time = 0) => {
    if (!isPlay) {
        img.src = "/audio-player/assets/svg/pause_24dp_00020C_FILL0_wght400_GRAD0_opsz24.svg";
        song.currentTime = time;
        song.play();
        isPlay = true;
    } else {
        img.src = "/audio-player/assets/svg/play_arrow_24dp_00020C_FILL0_wght400_GRAD0_opsz24.svg";
        song.pause();
        isPlay = false;
    }
};
//Update progress bar and current time
setInterval(() => {
    if (isPlay) {
        progressBar.value = song.currentTime;
        currentTime.textContent = formatTime(song.currentTime);
        paintProgressBar();
    }
}, 500);
//Fill progress bar with color when song is playing
const paintProgressBar = () => {
    const value = progressBar.value;
    const percentage = (value / progressBar.max) * 100;
    progressBar.style.background = `linear-gradient(to right, #356f95 0%, #356f95 ${percentage}%, #dfdad9 ${percentage}%, #dfdad9 100%)`;
};
//Play song from chosen value on progress bar
progressBar.oninput = () => {
    paintProgressBar();
    song.currentTime = progressBar.value;
    if (!isPlay) {
        playPause(song.currentTime);
    }
};
//Play next song
let playNum = 0;
let playlistLength = playlist.length;
const playNext = () => {
    if (playNum < playlistLength - 1) {
        playNum += 1;
    } else {
        playNum = 0;
    }
    changeTrack(playlist[playNum]);
    playPause();
};
//Play previous song
const playPrev = () => {
    if (playNum === 0) {
        playNum = playlistLength - 1;
    } else {
        playNum -= 1;
    }
    changeTrack(playlist[playNum]);
    playPause();
};
//Change track
const changeTrack = (track) => {
    const name = document.getElementById('name');
    const group = document.getElementById('group');
    const cover = document.getElementById('cover');
    song.src = track.source;
    name.textContent = track.name;
    group.textContent = track.group;
    cover.src = track.cover;
    cover.alt = `${track.name} cover`;
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25)), url(${track.cover})`;
    progressBar.value = 0;
    progressBar.style.setProperty('--value', '0%');
};
//Add event listeners to controls
playPauseBtn.addEventListener('click', () => playPause(song.currentTime));
playForward.addEventListener('click', () => playNext());
playBackward.addEventListener('click', () => playPrev());