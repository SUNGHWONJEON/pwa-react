import React, { useState, useEffect } from 'react';
import CameraModule from '../components/message/CameraModule';
import VideoRecorder from '../components/message/VideoRecorder';
import NewCamera from '../components/message/NewCamera';

const MessagePicture = () => {
    const [videoSave, setVideoSave] = useState([]);

    return(
        <div className="message-wrapper">
            <div className="message-picture">
                
                {/* <Camera videoSave={videoSave} /> */}
                <VideoRecorder />
                <input type="file" className="file" name="filePath" multiple="multiple" />
                <div className="message-box">
                    <input className="message-btn grey" type="button" value="녹화저장" />
                    <input className="message-btn orange" type="submit" value="녹화시작" />
                </div>
            </div>
        </div>
    );
};

export default MessagePicture;