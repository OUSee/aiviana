<script setup>
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

function updateStatus(text, show = true) {
    if (show) statusEl.textContent = text;
    console.log("[СТАТУС]:", text);
}

function getVolume(dataArray) {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    return Math.sqrt(sumSquares / dataArray.length) / 128;
}

function startInterview() {
    startBtn.style.display = "none";
    updateStatus("Говорю: Приветственное сообщение");

    const audio = new Audio("start.wav");
    audio.play();
    audio.onended = () => {
        listenToUser();
    };
}

async function listenToUser() {
    updateStatus("Слушаю");

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
            updateStatus("Слушаю");
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
            console.log("🟢 Начало записи (обнаружена речь)");
            mediaRecorder.start();
            hasStartedRecording = true;
        }

        if (hasStartedRecording) {
            recordedVolumes.push(volume);
            if (recordedVolumes.length > 200) recordedVolumes.shift();

            const now = Date.now();
            if (volume < silenceThreshold) {
                if (!silenceStartTime) {
                    silenceStartTime = now;
                } else if (now - silenceStartTime > silenceDelay && !confirmPauseTimeout) {
                    updateStatus("Готовлюсь к анализу");
                    confirmPauseTimeout = setTimeout(() => {
                        analyser.getByteTimeDomainData(dataArray);
                        const v = getVolume(dataArray);
                        if (v < silenceThreshold) {
                            mediaRecorder.stop();
                        } else {
                            updateStatus("Слушаю");
                            silenceStartTime = null;
                            confirmPauseTimeout = null;
                        }
                    }, confirmPauseDelay);
                }
            } else {
                silenceStartTime = null;
                if (confirmPauseTimeout) {
                    clearTimeout(confirmPauseTimeout);
                    confirmPauseTimeout = null;
                    updateStatus("Слушаю");
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
    updateStatus("Анализирую");

    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("uid", uid);

    try {
        const response = await fetch("/api/process", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            console.error("Ошибка от сервера:", await response.text());
            updateStatus("Ошибка при анализе. Повторите попытку.");
            return;
        }

        const data = await response.json();

        updateStatus("Говорю: ответ от AI");
        const botAudio = new Audio(data.audio_path);
        botAudio.play();

        botAudio.onended = () => {
            listenToUser(); // продолжить цикл
        };
    } catch (err) {
        console.error("Ошибка при отправке запроса:", err);
        updateStatus("Сетевая ошибка. Повторите попытку.");
    }
}
</script>