import React, { useEffect, useRef ,useState } from 'react'

import Webcam from "react-webcam";

const CameraModule = ({videoSave}) => {

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [fileUpload, setFileUpload] = useState({});
    const [filelist,setFilelist] = useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
      setRecordedChunks([]);
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => { //-> 버튼 누르면 업로드 되도록 수정 단서는 blob
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/mp4"
        });
        console.log(blob);
   
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.mp4";
        a.click();
        //window.URL.revokeObjectURL(url); //->주석처리시 동영상 링크 이동
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    const captureSave = () =>{
      videoSave(recordedChunks);
    
      //navigate("/boardNew");
      //현재 저장된 사진을 boardeditor로 가져온후 그곳에서 저장하기를 누르면 처리가 되는 구조로
      //console.log(imgSrc);
    }


    return (
        <>
            <Webcam audio={true} ref={webcamRef} />
            {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && ( 
        
            <button onClick={captureSave}>업로드</button>
            
            )}
      </>
    );
  
    

}
export default CameraModule;