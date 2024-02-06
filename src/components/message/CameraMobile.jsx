import React, { useRef, useState } from 'react';

const CameraMobile = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const inputRef = useRef(null);

    const handleCapture = () => {
        const input = inputRef.current;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        // 이미지를 업로드하는 로직을 구현합니다.
        // 여기서는 이미지를 console에 출력하는 예시를 보여줍니다.
        console.log(imageSrc);
    };

  return (
    <div>
        <input type="file" accept="image/*" capture="environment" ref={inputRef} />
        <button onClick={handleCapture}>사진 촬영</button>
            {imageSrc && (
                <div>
                    <img src={imageSrc} alt="Captured" />
                    <button onClick={handleUpload}>업로드</button>
                </div>
            )}
    </div>
    );
};

export default CameraMobile;











import React, { useRef, useState } from 'react';

const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      const videoURL = URL.createObjectURL(blob);
      setVideoSrc(videoURL);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    setRecording(false);
  };

  return (
    <div>
      {recording ? (
        <button onClick={handleStopRecording}>녹화 중지</button>
      ) : (
        <button onClick={handleStartRecording}>녹화 시작</button>
      )}
      <video ref={videoRef} autoPlay muted controls />
      {videoSrc && (
        <div>
          <p>녹화된 동영상:</p>
          <video src={videoSrc} controls />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;

