import React, { useRef , useState, useEffect , useCallback } from 'react';
import dayjs from 'dayjs';

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const mediaRecorder = useRef(null);
    const videoChunks = useRef([]);
    const [mimeType, setMinmeType] = useState('video/webm');
    
    //권한 얻기
    const getMediaPermission = useCallback(async () => {
        try {
            const videoConstraints = {
                audio: false,
                video: true,
            };
            
            const videoStream = await navigator.mediaDevices.getUserMedia(
                videoConstraints
            );
    
            if (videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }

            //MediaRecorder 추가
            const combinedStream = new MediaStream([
                ...videoStream.getVideoTracks()
            ]);

            const recorder = new MediaRecorder(combinedStream, {
                mimeType: mimeType,
            });

            recorder.ondataavailable = (e) => {
                if (typeof e.data === 'undefined') return;
                if (e.data.size === 0) return;
                videoChunks.current.push(e.data);
            };

            mediaRecorder.current = recorder;
        } catch (err) {
            console.log(err);
        }
    }, []);
  
    useEffect(() => {
        getMediaPermission();
    }, []);
    
    const downloadVideo = () => {
        const videoBlob = new Blob(videoChunks.current, { type: mimeType });
        const videoUrl = URL.createObjectURL(videoBlob);
        const link = document.createElement('a');

        link.download = `My video - ${dayjs().format('YYYYMMDD')}.webm`;
        link.href = videoUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };

    const uploadVideo = () => {
        const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', videoBlob);
    };

    return (
        <div className="camera-container">
            <video ref={videoRef} className="camera-video" autoPlay />
            <button onClick={() => mediaRecorder.current?.start()} >
                Start Recording
            </button>
            <button onClick={() => mediaRecorder.current?.stop()} >
                Stop Recording
            </button>

            <button onClick={downloadVideo}>Download</button>
        </div>
    );
  };
  
  export default VideoRecorder;