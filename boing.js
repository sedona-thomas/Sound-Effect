/*
 * Sedona Thomas snt2127
 * boing.js:
 */

document.addEventListener("DOMContentLoaded", function (event) {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let activeOscillators = {}
    let activeGainNodes = {}

    const playButton = document.getElementById("play");
    playButton.addEventListener('click', play, false);
    function play(event) {
        if (!audioCtx) {
            playSound();
            return;
        }
        else if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        else if (audioCtx.state === 'running') {
            audioCtx.suspend();
        }
    }

    function playSoundEffect() {

        freq = 100;
        lfoFreq = 2;

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

}, false);
