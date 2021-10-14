/*
 * Sedona Thomas snt2127
 * crackling_fire.js:
 */

var audioCtx;
var biquad;

const playButton = document.getElementById("play");
playButton.addEventListener('click', play, false);
function play(event) {
    if (!audioCtx) {
        audioCtx = initAudio();
        cracklingFire();
        return;
    }
    else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}

function initAudio() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

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
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
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