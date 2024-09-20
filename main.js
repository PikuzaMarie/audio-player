const progressBar = document.getElementById('progress-bar');
const song = document.getElementById('song');
const playPauseBtn = document.getElementById('btn-play-pause');
const playBackward = document.getElementById('btn-backward');
const playForward = document.getElementById('btn-forward');
const img = playPauseBtn.querySelector('img');
const endTime = document.getElementById('end');
let isPlay = false;

//Format duration time
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

//Set progress bar values and duration time
song.onloadedmetadata = () => {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    endTime.textContent = formatTime(song.duration);
}

//Play-Pause function
const playPause = () => {
    if(!isPlay) {
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
        img.src = "/assets/svg/pause_24dp_00020C_FILL0_wght400_GRAD0_opsz24.svg";
        isPlay = true;
        song.currentTime = 0;
        song.play();
    } else {
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        img.src = "/assets/svg/play_arrow_24dp_00020C_FILL0_wght400_GRAD0_opsz24.svg";
        isPlay = false;
        song.pause();
    }
}

playPauseBtn.addEventListener('click', playPause);