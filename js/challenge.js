let intervalID;
const pause = document.getElementById('pause');
const buttons = document.getElementsByTagName('button');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const timer = document.getElementById('counter');
const heartButton = document.getElementById('heart');
const ul = document.querySelector('.likes');
const form = document.querySelector('#comment-form');
const commentList = document.querySelector('#list')

let buttonsArray = [];

function countUp() {
    timer.textContent++
};

intervalID = setInterval(countUp, 1000);

plusButton.addEventListener('click', () => {
    timer.textContent++
});

minusButton.addEventListener('click', () => {
    timer.textContent--
});


for (button of buttons) {
    if (button.id != 'pause') {
        buttonsArray.push(button)
    }
};

pause.addEventListener('click', function() {
    if (pause.textContent === 'pause') {
        clearInterval(intervalID)
        buttonsArray.forEach(button => disableButtons(button))
        replacePause()
    } else if (pause.textContent == 'resume') {
        intervalID = setInterval(countUp, 1000);
        buttonsArray.forEach(button => enableButtons(button))
        replacePause()
    }
});

function disableButtons(button) {
    button.setAttribute('disabled', true)
};

function enableButtons(button) {
    button.removeAttribute('disabled');
};

function replacePause() {
    if (pause.textContent === 'pause') {
        pause.textContent = 'resume'
    } else if (pause.textContent === 'resume') {
        pause.textContent = 'pause'
    }
};

let x = 0
heartButton.addEventListener('click', () => {
        if (x === 0 || document.querySelector('.likes').childNodes[x-1].childNodes[0].textContent != timer.textContent) {
            x = x + 1
            let li = document.createElement('li')
            li.innerHTML = `<span>${timer.textContent}</span> has been liked <span>
            <span>1</span> time</span>`
            ul.appendChild(li)
        } else if (document.querySelector('.likes').childNodes[x-1].childNodes[0].textContent === timer.textContent) {
            let likeCount = Number(document.querySelector('.likes').childNodes[x-1].childNodes[2].childNodes[1].childNodes[0].textContent)
            let updatedLi = document.querySelector('.likes').childNodes[x-1]
            updatedLi.innerHTML = `<span>${timer.textContent}</span> has been liked <span>
            <span>${likeCount + 1}</span> times</span>`
        }  
});

form.submit.addEventListener('click', (e) => {
    let input = form.comment_input
    let p = document.createElement('p')
    e.preventDefault()
    p.textContent = input.value
    commentList.appendChild(p)
});
