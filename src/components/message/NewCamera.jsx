import React, { useState, useEffect, useRef } from 'react';

function NewCamera() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!stream) {
      // getUserMedia를 사용하여 카메라 스트림 가져오기
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
        });
    }

    // 컴포넌트 언마운트 시 카메라 스트림 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream]);

  return (
    <div>
      {stream && <video autoPlay playsInline ref={videoRef} />}
    </div>
  );
}

export default NewCamera;
