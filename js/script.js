
let nyPoints = 0;
let laPoints = 0;
let progressBarCount = 2

//build progress bar
function progressBar(){
    const getForms = document.querySelectorAll('.quiz-form').length + 1;
    const percBox = 100 / getForms;

    for(let i=0; i<getForms; i++) {
        document.getElementById('progress-bar').innerHTML +='<div style="width:' + percBox + '%"></div>';
    }

}

//eneble 'next' button only after a radio button has been chosen
function changeOnRadio() {
    let getRadios = document.getElementsByTagName('input');

    for (var i = 0; i < getRadios.length; i++) {
        let newRadio = getRadios[i];
        getRadios[i].addEventListener('change', function(){
            newRadio.parentNode.parentNode.children[3].removeAttribute('disabled');
        })
    }

}

window.onload = progressBar();
window.onload = changeOnRadio();

//start of the quiz
function quizStart(target) {
    document.getElementById(target).nextSibling.nextSibling.style.display='block';
    document.getElementById(target).style.display = 'none';
    document.getElementById('progress-bar').style.display = 'block';
    document.querySelector('#progress-bar div:first-child').style.display='inline-block';
};


//functionality onclick 'next button'
function checkAnswers(elem) {
    let radios = document.getElementsByTagName('input');
    let value;
    //lookout for checked buttons and collect values
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            value = radios[i].value;       
        }
    }
    //update points for each city
    if(value == 'la') {
        laPoints = laPoints + 1;
    }
    else if(value == 'ny') {
        nyPoints = nyPoints + 1;
    }

    //hide current question and display next one
    elem.parentNode.style.display = 'none';
    elem.parentNode.nextSibling.nextSibling.style.display = 'block';

    //display results
    let checkNextElement = elem.parentNode.nextSibling.nextSibling.classList.contains('results');
    if (checkNextElement) {
        if (nyPoints > laPoints) {
            document.querySelector('.results h3').append(' NY!');
        } else {
            document.querySelector('.results h3').append(' LA!');
        }
    }

    //update progress bar
    document.querySelector('#progress-bar div:nth-child(' + progressBarCount + ')').style.display='inline-block';
    progressBarCount = progressBarCount + 1;
}