import React, { useState, useEffect, useRef} from 'react';
import { useRecoilState } from "recoil";
import { messageData } from "../store/store";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import HeaderTop from "../components/header/HeaderTop";
import AudioRecorder from '../components/common/AudioRecorder';
import axios from 'axios';
import Loading from '../components/common/Loading';
import ReceiverAdd from '../components/message/ReceiverAdd';

const MessageWrite = (props) => {
    const [messageOrigin, setMessageOrigin] = useRecoilState(messageData);
    const messagePage = useParams();
    const [writeType, setWriteType] = useState(messagePage.pageNum === undefined || messagePage.pageNum === null ? 'new' : 'update');
    
    const [inputValue, setInputValue] = useState({});
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState({});
    const [textLength, setTextLength] = useState(0);
    const [wrapperScrolledType, setWrapperScrolledType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(writeType === 'new' || messagePage.pageNum === undefined || messagePage.pageNum === null) {
            setCurrentData({
                msgId: Date.now(),
                msgSaved: null,
                msgText: '',
                crateDate: '',
                modifyDate: '',
                deleteDate: '',
                msgReceiver: [
                ],
                msgAttach: [
                ]
            });
        }else{
            setCurrentData(messageOrigin.msgList[messagePage.pageNum]);
            setTextLength(messageOrigin.msgList[messagePage.pageNum].msgText.length);
        }
    }, [])

    const onTextArea = (e) => {
        const tempMsgData = {...currentData};
        tempMsgData.msgText = e.target.value;
        setCurrentData(tempMsgData);
        console.log('e.target.value : ' + e.target.value);
        setTextLength(e.target.value.length);
    }


    //임시 저장하기
    const saveMessageData = (type) => {

        //만약 msgList에 id값이 같은것이 있다면 업데이트 아니면 신규
        const tempNewData = {
            ...currentData, msgSaved: type
        }

        const index = messageOrigin.msgList.findIndex(el => String(el.msgId) === String(tempNewData.msgId));
        console.log('===========index : ' + index);

        let newSaveData = {};

        if(index === -1) {
            //아이디 맞는 것이 없으면 새로운 글 작성
            newSaveData = {
                ...messageOrigin,
                msgList: [
                    tempNewData,
                    ...messageOrigin.msgList
                ]
            }
    
        }else{
            //아이디 맞는 것이 있으면 업데이트
            let tempMsgList = [
                ...messageOrigin.msgList
            ]
            tempMsgList[index] = currentData;
            
            newSaveData = {
                ...messageOrigin,
                msgList: tempMsgList
            }
        }
        
        console.log('임시저장하기 -> newSaveData : ' + newSaveData);
        setMessageOrigin(newSaveData);
    }

    //만약 임시저장 클릭시 메인으로
    const onTempSave = (e) => {
        e.preventDefault();
        saveMessageData('temp');
        navigate('/message');

        console.log('임시저장 클릭 == currentData : '+ currentData);
    }

    //저장 눌렀을 시 저장되고 메인 페이지로 넘어감
    const onSubmitMessage = (e) => {
        e.preventDefault();
        //localStorage.removeItem('recoil-persist');//저장되어 있는 값 초기화
        
        let sendData = new FormData();
        const attachments = currentData.msgAttach;//첨부파일 목록
        const receiver = currentData.msgReceiver;//수신인 목록

        //sendData.append('message', new Blob([JSON.stringify(messageOrigin)], { type: "application/json" }));
        const tempMsg = {
            userId: messageOrigin.userId,
            msgText: currentData.msgText,
            msgId: currentData.msgId,
            msgSaved: currentData.msgSaved
        }
        //sendData.append('message', JSON.stringify(tempMsg));
        sendData.append('message', new Blob([JSON.stringify(tempMsg)], { type: "application/json" }));
        //수신인 목록 
        console.log('receiver : ' + JSON.stringify(receiver));
        sendData.append('receiver', new Blob([JSON.stringify(receiver)], { type: "application/json" }));
        receiver.map(re => {
            
            //sendData.append('receiver', JSON.stringify(re));
        })
        
        //첨부파일
        attachments.map(at => {
            console.log('at.attach : ' + at.attach);
            sendData.append('attachments', at.attach);
        })
        
        console.log('sendData : ' + Array.from(sendData));
        

        //로딩시작하고
        setIsLoading(true);

        axios.post('http://192.168.31.141:2222/api/message', sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log('메시지 등록 성공 res : ' + JSON.stringify(res.data));
            //로딩 끝내고
            setIsLoading(false);

        }).catch(error => {
            console.log('메시지 등록 실패 : ' + error);
        })
    }

    //용량 5메가 까지 허용
    


    //일반 파일 첨부
    const onGetFile = (e) => {
        //첨부파일 배열에 담기
        const files = Array.from(e.target.files);
        
        console.log('files[0] : ' + JSON.stringify(files));
        if(files[0]){
            //이미지가 있을때 url첨부하여 미리보기로 보이기
        }

        const newAttachData = files.map(f => {
            const blob = new Blob([f], { type: f.type }); // Blob 생성자에 배열을 전달하여 Blob 객체 생성
            console.log('type : ' + blob.type);
            const blobType = blob.type.split('/').shift();
            if(blobType === 'video'){
                const blobElement = document.createElement(blobType);
                blobElement.addEventListener('loadedmetadata', () => {
                    const durationInSeconds = blobElement.duration;
                    const durationInMinutes = Math.floor(durationInSeconds / 60);
                    const remainingSeconds = Math.floor(durationInSeconds % 60);
                    console.log(`${blobType}  길이: ${durationInMinutes}분 ${remainingSeconds}초`);
                    blobElement.remove();
                });

                blobElement.src = URL.createObjectURL(f);
                
                blobElement.style.display = 'none';
            }else if(blobType === 'audio') {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const reader = new FileReader();

                reader.onload = (event) => {
                    audioContext.decodeAudioData(event.target.result, (buffer) => {
                        const durationInSeconds = buffer.duration;
                        const durationInMinutes = Math.floor(durationInSeconds / 60);
                        const remainingSeconds = Math.floor(durationInSeconds % 60);
                        console.log(`음성 길이: ${durationInMinutes}분 ${remainingSeconds}초`);
                    });
                };

                reader.readAsArrayBuffer(f);
            }
            

            return {
                attachSize: blob.size,
                attachType: blob.type,
                attachName: f.name,
                attach: blob
            };
        });
        if(newAttachData && newAttachData.length > 0) {
            const tempCurrentData = {
                ...currentData,
                msgAttach: [
                    ...currentData.msgAttach,
                    ...newAttachData
                ]
            };
            
            setCurrentData(tempCurrentData);
            console.log('getFile == tempCurrentData : ' + JSON.stringify(tempCurrentData));
        }
        
        
        //console.log('getFile == currentData : ' + JSON.stringify(currentData)); //=>바로 적용이 안돼서 확인 불가 useEffect로 확인해야만 함
    }

    //오디오 파일 첨부
    const getAudioFile = (audio, url, blob) => {
        console.log('getAudioFile === audio : ' + audio);
        console.log('getAudioFile === url : ' + url);
        console.log('getAudioFile === blob : ' + blob);

        const newAttachData = {
            attachSize: blob.size,
            attachType: blob.type,
            attachName: url,
            attach: blob
        };

        const tempCurrentData = {
            ...currentData,
            msgAttach: [
                ...currentData.msgAttach,
                newAttachData
            ]
        };

        setCurrentData(tempCurrentData);
        console.log('getAudioFile === tempCurrentData : ' + JSON.stringify(tempCurrentData));
        console.log('getAudioFile === currentData : ' + JSON.stringify(currentData));
    }

    //첨부파일 삭제하기
    const onDeleteFile = (e, key) => {
        e.preventDefault();
        
        const updateAttach = currentData.msgAttach.filter((el, idx) => idx !== key );

        setCurrentData(prevData => ({
            ...prevData,
            msgAttach: updateAttach
        }))
    }

    //===============수신자 첨부 부분===================
    //input값이 바뀔때마다 value값 저장
    const onChanged = (val) => {
        console.log('val : ' + val);
        setInputValue((prevValues) => ({
            ...prevValues,
            [val.name]: val.value
        }))
    }

    //받는 사람 저장
    const onSavedReceivePerson = (receiver) => {

        //currentData.msgReceiver에 이미 receiver의 핸드폰 번호가 있으면 추가하지 않기
        const filteredReceiver = receiver.filter(item => !currentData.msgReceiver.find(exist => exist.receiverPhone === item.receiverPhone));
        const updatedMsgReceiver = [...currentData.msgReceiver, ...filteredReceiver];
        const updatedMessage = { ...currentData, msgReceiver: updatedMsgReceiver };

        //currentData 상태를 업데이트
        setCurrentData(updatedMessage);

        console.log('newMessageData 2 receiver : ' + JSON.stringify(receiver));
        console.log('newMessageData 2 filteredReceiver : ' + JSON.stringify(filteredReceiver));
        console.log('newMessageData 2 updatedMessage : ' + JSON.stringify(updatedMessage));
        console.log('newMessageData 2 currentData : ' + JSON.stringify(currentData));
    }

    //x버튼 클릭시 받는 사람 삭제
    const onReceiverDelete = (e, id) => {
        //지우기
        e.preventDefault();
        console.log('id : ' + id);
        let updatedMsgReceiver = currentData.msgReceiver.filter(receiver => String(receiver.receiverId) !== String(id));
        let updatedMessage = { ...currentData, msgReceiver: updatedMsgReceiver };
        setCurrentData(updatedMessage);
        console.log('onReceiverDelete == updatedMessage : ' + JSON.stringify(updatedMessage));
        
    }
    //===============수신자 첨부 부분end===================

    return(
        <>
        <HeaderTop />
        <div className={`message-wrapper ${wrapperScrolledType ? 'not-scrolled' : ''}`}>
            <div className="message-container">
                <form onSubmit={onSubmitMessage}>

                    {/* 타이틀 */}
                    <div className="message-box">
                        <div className="message-text-box">
                            <h2>전하고 싶은<br/>말씀을 남겨 주세요.</h2>
                            <p>메시지는 언제든지 수정할 수 있으며,<br/>보험금 지급 시점에 수신인에게 전달됩니다.</p>
                        </div>
                    </div>

                    {/* 글쓰기 */}
                    <div className="message-box">
                        <div className="message-write-title">내용입력</div>
                        <textarea name="message_text" onChange={onTextArea} placeholder="내용을 입력해주세요." value={Object.keys(currentData).length > 0 ? currentData.msgText : ''}></textarea>
                        <div>{textLength}/1000</div>
                    </div>
                    
                    {/* 첨부하기 */}
                    
                    <div className="message-box attach">
                        <div className="message-attach-btn-box">
                            
                            <input type="file" accept="image/*" onChange={onGetFile} capture="camera" />카메라
                            <input type="file" accept="video/*" onChange={onGetFile} capture="camcorder" />캠코더
                            <input type="file" accept="audio/*"  onChange={onGetFile} capture="microphone" />녹음
{/* 
                            <input type="file" className="message-btn-attach" onChange={onGetFile} multiple="multiple"
                                name="attachFile" id="upload-file-img"  hidden/>
                            <label htmlFor="upload-file-img">
                                <img src="/img/add_file.png" className="message-btn-attach-img" />
                            </label> */}
                            
                            {/* 음성녹음 */}
                            <AudioRecorder className="message-btn-attach" getAudioFile={getAudioFile}/>
                        </div>


                        <div className="message-attach-box">
                            <ul>
                                {
                                    currentData.msgAttach !== null && currentData.msgAttach !== undefined ? 
                                        currentData.msgAttach.length > 0 ? 
                                            currentData.msgAttach.map((attach, key) => {
                                                return(
                                                    <li className="selected-image" key={key}>
                                                        {/* <img className="sel-img" src={}/> */}
                                                        <span>{attach.attachName}</span>
                                                        <button className="file-delete-btn" onClick={(e) => onDeleteFile(e, key)}>
                                                            x
                                                            <img src="" />
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        : ''
                                    : ''
                                }

                            </ul>
                        </div>
                    </div>
                    {/* 수신인 추가 팝업 */}
                    <ReceiverAdd inputValue={inputValue} componentType={'receiver'} setWrapperScrolledType={setWrapperScrolledType}
                        setInputValue={setInputValue} onChanged={onChanged} onSavedReceivePerson={onSavedReceivePerson}/>
                    
                    {/* 수신인 리스트 */}
                    <ul className="message-send-box">
                        {
                            currentData.msgReceiver !== null && currentData.msgReceiver !== undefined && Object.keys(currentData.msgReceiver).length > 0 ? 
                            
                            //메시지에서 받을사람일때
                            currentData.msgReceiver.map((receiver, key)=> {
                                    return(
                                        <li key={key}>
                                            <span>{receiver.receiverName}({receiver.receiverRelation})</span>
                                            <button onClick={(e) => onReceiverDelete(e, receiver.receiverId)}>x</button>
                                        </li>
                                    )
                                })
                                
                            : ''
                        }
                    </ul>
                    

                    {/* 버튼 박스 */}
                    <div className="message-box">
                        <div className="message-write-line"></div>
                            
                        <button className="message-btn grey" onClick={onTempSave}>임시저장</button>
                        <input className="message-btn orange" type="submit" value="작성완료" />

                    </div>
                </form>
                        
                
                
                
            </div>
            
        </div>
        </>
        
    );
};

export default MessageWrite;


