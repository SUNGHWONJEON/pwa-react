import { useRef, useState } from "react";


const SoundRecorder = ({getAudioFile}) => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const audioChunk = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');

    //녹음 시작
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);


            recorder.ondataavailable = (e) => {
                console.log('e.data.size : ' + e.data.size)
                if(e.data.size > 0) {
                    // 데이터 저장
                    audioChunk.current.push(e.data);
                }
            }

            recorder.onstop = () => {
                const chunk = audioChunk.current;
                const audioBlob = new Blob(chunk, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                getAudioFile(chunk, audioUrl, audioBlob);
                console.log('audioUrl : ' + audioUrl);
            }

            recorder.start();
            setIsRecording(true);

        }catch (error) {
            console.error('음성녹음 에러 :', error);
        }
        
    }

    //녹음 정지
    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    }

    const onAudioRecordBtnClick = (e) => {
        e.preventDefault();
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    return(
        <div>
            SoundRecorder
            <button onClick={onAudioRecordBtnClick}>{!isRecording ? '녹음' : '정지'}</button>

            
            <div>
                오디오 컨트롤
                <audio controls src={audioUrl} />
                <a href={audioUrl} download>
                    download
                </a>
            </div>
            
            
        </div>
    )
}


export default SoundRecorder;