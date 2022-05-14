const bar = document.querySelector('.progress-bar');
const queued = document.querySelector('.queued');
const button = document.getElementById('start-progress');
let loader = false;
let width = 0;
let count = 0;

function loadBar() {
    queued.innerText = ++count;
    if (loader === false) {
        bar.style.width = 0;
        tick();

    }
}

function tick() {
    loader = true;
    width += 1
    if (width > 100) {
        queued.innerText = --count;
        width = 0;
        if (count < 1) {
            loader = false;
            return;
        }
    }
    bar.style.width = `${width}%`;
    setTimeout(tick, 30);
}
button.addEventListener("click", loadBar)