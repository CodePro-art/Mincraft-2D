// show leadboard
function showLeadboard() {
    let leadboard = document.querySelector('.leadboard')
    leadboard.style.display = 'flex';
    setTimeout(() => {
      leadboard.classList.add('show');
      leadboard.classList.remove('hide');
    }, 10); 
    leadboard.style.display = 'flex';
}

// show leadboard
function hideLeadboard() {
    let leadboard = document.querySelector('.leadboard');
    leadboard.classList.add('hide');
}