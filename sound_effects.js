/*
 * Sedona Thomas snt2127
 * sound_effects.js:
 */

var audioCtx;
var biquad;

const playButton = document.getElementById("play");
playButton.addEventListener('click', play, false);
function play(event) {
    if (!audioCtx) {
        audioCtx = initAudio();
        //testing();
        //makeDialTone();
        makeTibetanSingingBowl();
        return;
    }
    else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}

function testing() {
    lowpass = initLowpass(300);
    sound = initSound();
    sound.connect(lowpass).connect(audioCtx.destination);
}

function initAudio() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

function initLowpass(freq) {
    lowpassFilter = audioCtx.createBiquadFilter();
    lowpassFilter.type = "lowpass";
    lowpassFilter.Q.value = 100;
    lowpassFilter.frequency.setValueAtTime(freq, audioCtx.currentTime);
    lowpassFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    return lowpassFilter;
}

function initSound() {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(700, audioCtx.currentTime);
    osc.type = "sine";
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start();

    gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.5);
    gainNode.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.5);

    let lfo = audioCtx.createOscillator();
    lfo.frequency.value = 20;
    let lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start();

    return osc;
}

// makeTibetanSingingBowl(): plays the sound of a Tibetan singing bowl
// I was playing around with the lowpass filter and lfo and accidentally made the sound of the meditation bowls
function makeTibetanSingingBowl() {
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

// makeDialTone(): plays the dial tone sound
// I first started with a dial tone to practice making the sound work
function makeDialTone() {
    const osc1 = audioCtx.createOscillator();
    osc1.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc1.type = "sine";
    const gainNode1 = audioCtx.createGain();
    gainNode1.gain.setValueAtTime(0, audioCtx.currentTime);
    osc1.connect(gainNode1).connect(audioCtx.destination);
    osc1.start();

    gainNode1.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.5);
    gainNode1.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.5);

    const osc2 = audioCtx.createOscillator();
    osc2.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc2.type = "sine";
    const gainNode2 = audioCtx.createGain();
    gainNode2.gain.setValueAtTime(0, audioCtx.currentTime);
    osc2.connect(gainNode2).connect(audioCtx.destination);
    osc2.start();

    gainNode2.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.5);
    gainNode2.gain.setTargetAtTime(0.4, audioCtx.currentTime, 0.5);
}






/*

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



/*
function playSoundEffect() {

    key = "temp";
    freq = 100;
    lfoFreq = 2;
    waveform = "sine";

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.type = waveform;
    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start();

    activeGainNodes[key] = [gainNode];
    activeOscillators[key] = [osc];

    let lfo = audioCtx.createOscillator();
    lfo.frequency.value = lfoFreq;
    let lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start();
    activeOscillators[key].push(lfo);

    let gainNodes = Object.keys(activeGainNodes).length;
    gainNode.gain.setTargetAtTime(0.7 / gainNodes, audioCtx.currentTime, 0.1);

    Object.keys(activeGainNodes).forEach(function (gainNodeKey) {
        activeGainNodes[gainNodeKey][0].gain.setTargetAtTime(0.4 / gainNodes, audioCtx.currentTime, 0.1);
    });
}
*/