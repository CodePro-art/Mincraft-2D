// show media player
function showMediaPlayer() {
    mediaPlayerContainer = document.querySelector('.media-player')
    // mediaPlayerContainer.style.display = 'flex';
    setTimeout(() => {
        mediaPlayerContainer.classList.add('show');
        mediaPlayerContainer.classList.remove('hide');
    }, 10); 
    setTimeout(() => {
        mediaPlayerContainer.style.display = 'flex';
    }, 10); 
}

// show media player
function hideMediaPlayer() {
    const mediaPlayerContainer = document.querySelector('.media-player');
    const video = document.getElementById('minecraftTrailer');

    setTimeout(() => {
        mediaPlayerContainer.classList.add('hide');
        mediaPlayerContainer.classList.remove('show');
    }, 10); 
    setTimeout(() => {
        mediaPlayerContainer.style.display = 'none';
    }, 490); 
    video.pause();
    video.load();
}