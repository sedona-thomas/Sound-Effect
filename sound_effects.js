/*
 * Sedona Thomas snt2127
 * sound_effects.js: various sound effects
 */

var audioCtxRing;
var audioCtxBowl;
var audioCtxDial;

const dialButton = document.getElementById("dial");
dialButton.addEventListener('click', dial, false);

const ringButton = document.getElementById("ring");
ringButton.addEventListener('click', ring, false);

const bowlButton = document.getElementById("bowl");
bowlButton.addEventListener('click', bowl, false);

const dialButton1 = document.getElementById("key1");
dialButton1.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton1.value);
}, false);

const dialButton2 = document.getElementById("key2");
dialButton2.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton2.value);
}, false);
const dialButton3 = document.getElementById("key3");
dialButton3.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton3.value);
}, false);

const dialButton4 = document.getElementById("key4");
dialButton4.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton4.value);
}, false);

const dialButton5 = document.getElementById("key5");
dialButton5.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton5.value);
}, false);

const dialButton6 = document.getElementById("key6");
dialButton6.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton6.value);
}, false);

const dialButton7 = document.getElementById("key7");
dialButton7.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton7.value);
}, false);

const dialButton8 = document.getElementById("key8");
dialButton8.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton8.value);
}, false);

const dialButton9 = document.getElementById("key9");
dialButton9.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton9.value);
}, false);

const dialButton10 = document.getElementById("key*");
dialButton10.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton10.value);
}, false);

const dialButton11 = document.getElementById("key0");
dialButton11.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton11.value);
}, false);

const dialButton12 = document.getElementById("key#");
dialButton12.addEventListener('click', function () {
    makeTelephoneNumberKey(dialButton12.value);
}, false);

function dial(event) {
    if (!audioCtxDial) {
        audioCtxDial = initAudio();
        makeDialTone(audioCtx);
        return;
    }
    else if (audioCtxDial.state === 'suspended') {
        audioCtxDial.resume();
    }
    else if (audioCtxDial.state === 'running') {
        audioCtxDial.suspend();
    }
}

function ring(event) {
    if (!audioCtxRing) {
        audioCtxRing = initAudio();
        makeRingingTone(audioCtxRing);
        return;
    }
    else if (audioCtxRing.state === 'suspended') {
        audioCtxRing.resume();
    }
    else if (audioCtxRing.state === 'running') {
        audioCtxRing.suspend();
    }
}

function bowl(event) {
    if (!audioCtxBowl) {
        audioCtxBowl = initAudio();
        makeTibetanSingingBowl(audioCtx);
        return;
    }
    else if (audioCtxBowl.state === 'suspended') {
        audioCtxBowl.resume();
    }
    else if (audioCtxBowl.state === 'running') {
        audioCtxBowl.suspend();
    }
}

function initAudio() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

// makeTelephoneNumberKey(): plays the sound of a telephone key
function makeTelephoneNumberKey(key) {
    audioCtx = initAudio();

    freq1 = [697, 770, 852, 941];
    freq2 = [1209, 1336, 1477, 1633];

    if (key == "*") { key = 10; }
    else if (key == "0") { key = 11; }
    else if (key == "#") { key = 12; }
    else { key = parseInt(key); }

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.125, audioCtx.currentTime);

    const osc1 = audioCtx.createOscillator();
    osc1.frequency.setValueAtTime(freq1[((key - 1) % 3)], audioCtx.currentTime);
    osc1.type = "sine";
    osc1.connect(gainNode).connect(audioCtx.destination);
    osc1.start();

    const osc2 = audioCtx.createOscillator();
    osc2.frequency.setValueAtTime(freq2[Math.floor((key - 1) / 3)], audioCtx.currentTime);
    osc2.type = "sine";
    osc2.connect(gainNode).connect(audioCtx.destination);
    osc2.start();

    gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.1);
    gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.1);
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 0.5, 0.01); // between 45ms and 3s
}

// waits specified number of miliseconds to continue running code
// source: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line?rq=1
const delay = ms => new Promise(res => setTimeout(res, ms));

// makeRingingTone(): plays the ringing tone sound
async function makeRingingTone(audioCtx) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.125, audioCtx.currentTime);

    const osc1 = audioCtx.createOscillator();
    osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc1.type = "sine";
    osc1.connect(gainNode).connect(audioCtx.destination);
    osc1.start();

    const osc2 = audioCtx.createOscillator();
    osc2.frequency.setValueAtTime(480, audioCtx.currentTime);
    osc2.type = "sine";
    osc2.connect(gainNode).connect(audioCtx.destination);
    osc2.start();

    gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.1);
    gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.1);

    while (true) {
        await delay(2 * 1000);
        gainNode.gain.setTargetAtTime(0.1, audioCtx.currentTime, 0.01);
        gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.01);
        //audioCtx.suspend();
        await delay(4 * 1000);
        //audioCtx.resume();
        gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.1);
        gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.1);
    }
}

// makeDialTone(): plays the dial tone sound
// I first started with a dial tone to practice making the sound work
function makeDialTone(audioCtx) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.125, audioCtx.currentTime);

    const osc1 = audioCtx.createOscillator();
    osc1.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc1.type = "sine";
    osc1.connect(gainNode).connect(audioCtx.destination);
    osc1.start();

    const osc2 = audioCtx.createOscillator();
    osc2.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc2.type = "sine";
    osc2.connect(gainNode).connect(audioCtx.destination);
    osc2.start();

    gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.1);
    gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.1);
}

// makeTibetanSingingBowl(): plays the sound of a Tibetan singing bowl
// I was playing around with the lowpass filter and lfo and accidentally made the sound of the meditation bowls
function makeTibetanSingingBowl(audioCtx) {
    const osc1 = audioCtx.createOscillator();
    osc1.frequency.setValueAtTime(650, audioCtx.currentTime);
    osc1.type = "sine";
    const gainNode1 = audioCtx.createGain();
    gainNode1.gain.setValueAtTime(0, audioCtx.currentTime);
    osc1.connect(gainNode1).connect(audioCtx.destination);
    osc1.start();

    gainNode1.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.5);
    gainNode1.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.5);

    let lfo = audioCtx.createOscillator();
    lfo.frequency.value = 30;
    let lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain).connect(osc1.frequency);
    lfo.start();

    lowpass = initLowpass(300);
    osc1.connect(lowpass).connect(audioCtx.destination);
}

function initLowpass(freq) {
    lowpassFilter = audioCtx.createBiquadFilter();
    lowpassFilter.type = "lowpass";
    lowpassFilter.Q.value = 100;
    lowpassFilter.frequency.setValueAtTime(freq, audioCtx.currentTime);
    lowpassFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    return lowpassFilter;
}

/*
// attempted, not working

function cracklingFire() {
    biquad = initBiquad();
    let whiteNoise = makeWhiteNoise();
    whiteNoise.connect(biquad).connect(audioCtx.destination);
    initLfo();
}

function initLfo() {
    var lfo1 = audioCtx.createOscillator();
    modulationIndex = audioCtx.createGain();
    modulationIndex.gain.value = 200;
    lfo1.frequency.value = 100;
    lfo1.connect(modulationIndex).connect(biquad.frequency);
    lfo1.start()
}

function initBiquad() {
    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(300, audioCtx.currentTime);
    biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    return biquadFilter;
}

function makeWhiteNoise() {
    var bufferSize = 10 * audioCtx.sampleRate;
    var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    var output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.start(0);
    return whiteNoise;
}
*/