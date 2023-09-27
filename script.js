let speechSupported = true;
let recognition;
let speaking = false;

const voiceButton = document.getElementById('voiceButton');
const resultElement = document.getElementById('resultElement');
const textArea = document.getElementById('textArea');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "id";

recognition.addEventListener('result', (e) => {
    let transcript = Array.from(e.results)
                            .map(val => val[0].transcript)
                            .join('')
                            .toLocaleLowerCase();
    resultElement.innerHTML = transcript;
    textArea.value = transcript;
});

function start(){
    speaking = true;
    recognition.start();
}
    
function stop(){
    speaking = false;
    recognition.stop()
}


voiceButton.addEventListener('click', () => {
    if(speaking) stop();
    else start();
})