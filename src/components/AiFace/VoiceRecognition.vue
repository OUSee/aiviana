<script setup>
import { inject } from 'vue';

let audioContext, analyser, mediaRecorder;
let audioChunks = [];
let recordedVolumes = [];
let monitoringInterval, silenceStartTime, confirmPauseTimeout;
let stream;
let hasStartedRecording = false;
const uid = crypto.randomUUID();
const silenceThreshold = 0.02;
const silenceDelay = 2000;
const confirmPauseDelay = 2000;
const currentState = inject('currentState')
const audioDetected = inject('audioDetected')
const microOn = inject('microOn')
// hardcode
const ai_talk = inject('ai_talk')
// /hardcode

function updateStatus(status) {
    currentState.value = status
}

function getVolume(dataArray) {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    return Math.sqrt(sumSquares / dataArray.length) / 128;
}

// start here
function startInterview() {
    updateStatus("speak");
    // listenToUser();
    //microOn.value = false;
    // const audio = new Audio("https://aiviana.com/start.wav");
    // audio.play();
    // audio.onended = () => {
    //     listenToUser();
    // };
}


async function listenToUser() {
    updateStatus("listen");
    microOn.value = true
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    recordedVolumes = [];
    hasStartedRecording = false;

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        stopMonitoring();
        if (audioChunks.length === 0) {
            updateStatus('listen');
            setTimeout(() => listenToUser(), 1000);
        } else {
            sendToBackend();
        }
    };

    startMonitoring();
}

function startMonitoring() {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);

    monitoringInterval = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        const volume = getVolume(dataArray);

        if (!hasStartedRecording && volume > silenceThreshold) {
            mediaRecorder.start();
            hasStartedRecording = true;
        }

        if (hasStartedRecording) {
            recordedVolumes.push(volume);
            if (recordedVolumes.length > 200) recordedVolumes.shift();

            const now = Date.now();
            if (volume < silenceThreshold || microOn.value === false) {
                if (!silenceStartTime) {
                    silenceStartTime = now;
                    audioDetected.value = false;
                    ai_talk.value = false;
                } else if (now - silenceStartTime > silenceDelay && !confirmPauseTimeout || microOn.value === false) {
                    updateStatus("preprocessing");
                    confirmPauseTimeout = setTimeout(() => {
                        analyser.getByteTimeDomainData(dataArray);
                        const v = getVolume(dataArray);
                        if (v < silenceThreshold || microOn.value === false) {
                            mediaRecorder.stop();
                        } else {
                            updateStatus("listen");
                            silenceStartTime = null;
                            confirmPauseTimeout = null;
                            audioDetected.value = true;
                            ai_talk.value = true
                        }
                    }, confirmPauseDelay);
                }
            }
            else {
                silenceStartTime = null;
                audioDetected.value = true;
                ai_talk.value = true;
                if (confirmPauseTimeout) {
                    clearTimeout(confirmPauseTimeout);
                    confirmPauseTimeout = null;
                    updateStatus("listen");
                }
            }
        }
    }, 100);
}

function stopMonitoring() {
    clearInterval(monitoringInterval);
    if (confirmPauseTimeout) clearTimeout(confirmPauseTimeout);
    if (audioContext) audioContext.close();
    silenceStartTime = null;
    confirmPauseTimeout = null;
}

async function sendToBackend() {
    updateStatus("idle");

    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("uid", uid);

    try {
        const response = await fetch("https://aiviana.com/api/process", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            console.error("Ошибка от сервера:", await response.text());
            updateStatus('connecting');
            return;
        }

        const data = await response.json();


        updateStatus("speak");
        microOn.value = false;
        const botAudio = new Audio('https://aiviana.com' + data.audio_path);
        botAudio.play();
        botAudio.onended = () => {
            listenToUser();
        };
    } catch (err) {
        console.error("Ошибка при отправке запроса:", err);
        updateStatus('connecting');
    }
}
</script>

<template>
    <div class="navigate">
        <button @click="startInterview">Speak</button>
        <button @click="updateStatus('listen'); listenToUser()">Listen</button>
        <button @click="updateStatus('preprocessing')">PreAnalyze</button>
        <button @click="updateStatus('idle')">Idle</button>
        <button @click="updateStatus('connecting')">connecting</button>
    </div>
</template>