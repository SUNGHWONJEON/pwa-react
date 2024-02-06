import React, { useState, useEffect, useRef} from 'react';
import { useRecoilState } from "recoil";
import { messageData } from "../store/store";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import HeaderTop from "../components/header/HeaderTop";
import axios from 'axios';

const MessageWrite = (props) => {
    const [messageOrigin, setMessageOrigin] = useRecoilState(messageData);
    const messagePage = useParams();
    const [writeType, setWriteType] = useState(messagePage.pageNum === undefined || messagePage.pageNum === null ? 'new' : 'update');
    const [popupVisible,setPopupVisible] = useState(false);
    const [inputValue, setInputValue] = useState({});
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState({});
    const [textLength, setTextLength] = useState(0);

    useEffect(() => {
        if(writeType === 'new' || messagePage.pageNum === undefined || messagePage.pageNum === null) {
            setCurrentData({
                msgId: null,
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

    //팝업 안보이게
    const onPopDimed = () => {
        setPopupVisible(false);
    }

    //팝업 보이게
    const onPopShow = (e) => {
        e.preventDefault();
        setPopupVisible(true);
        setInputValue({
            receiverName: '',
            receiverPhone: '',
            receiverRelation: '',
        })
    }


    //input값이 바뀔때마다 value값 저장
    const onChanged = (e) => {
        const {name, value} = e.target;
        console.log('name : ' + name);
        console.log('value : ' + value);
        setInputValue((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    const onTextArea = (e) => {
        const tempMsgData = {...currentData};
        tempMsgData.msgText = e.target.value;
        setCurrentData(tempMsgData);
        console.log('e.target.value : ' + e.target.value);
        setTextLength(e.target.value.length);
    }

    //받는 사람 저장
    const onSavedReceivePerson = (e) => {
        
        //받는사람
        let receiver = {
            receiverId: Date.now(),
            receiverName: inputValue.receiverName,
            receiverRelation: inputValue.receiverRelation || '자녀',
            receiverPhone: inputValue.receiverPhone,
            isDelete: false,
            sendCount: 0
        }
        
        console.log('receiver : ' + JSON.stringify(receiver));
        let updateMsgReceiver = [...currentData.msgReceiver, receiver];
        let updatedMessage = {...currentData, msgReceiver: updateMsgReceiver};
        setCurrentData(updatedMessage);
        onPopDimed();
        console.log('newMessageData 2 : ' + currentData);
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
    }

    //저장 눌렀을 시 저장되고 메인 페이지로 넘어감
    const onSubmitMessage = async (e) => {
        localStorage.removeItem('recoil-persist');
        return;
        /*
        e.preventDefault();
        let sendData = new FormData();

        const sendMessage = { ...messageOrigin };
        

        
        //sendData.append('message', new Blob([JSON.stringify(messageOrigin)], { type: "application/json" }));



        //첨부파일
        attachments.map(attach => {
            sendData.append('attachments', new Blob(attach));
        })
        console.log(Array.from(sendData))
        

        //로딩시작하고
        

        axios.post('/api/message', sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log('res : ' + res.data);
            //로딩 끝내고

        }).catch(error => {
            console.log('error : ' + error);
        })


        formData.append('file', this.imageFile);
            formData.append('userNum', this.tempUserNum);

            this.$axios.post('/api/message', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                alert('사진 등록 성공');
                console.log('res.data : ' + res.data);
                console.log('res stringify : ' + JSON.stringify(res))
                //로딩 시작
                this.isLoading = true;
                this.callPythonApi(res.data[0], res.data[1], res.data[2]);
                onTempSave();
            })
            .catch(err => {
                alert('게시글 등록 실패');
                console.log(err);
            })
            */

    }

    // const getFile = (e) => {

    //     const file = e.target.files;
    //     const blob = new Blob(file)
    //     const newAttachData = {
    //         attachSize: blob.size,
    //         attachType: blob.type,
    //         attachName: file,
    //     }

    //     const tempCurrentData = {
    //         ...currentData,
    //         msgAttach: [
    //             ...currentData.msgAttach,
    //             newAttachData
    //         ]
    //     };
        
    //     setCurrentData(tempCurrentData);
    //     console.log('getFile == tempCurrentData : ' + tempCurrentData);
    // }

    return(
        <>
        <HeaderTop />
        <div className="message-wrapper">
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
                    
                    {/* 첨부하기 
                    <div className="message-box attach">
                        <input type="file" onChange={getFile} multiple="multiple" className="message-btn-attach">
                            첨부하기
                        </input>
                        <button className="message-btn-attach">
                            촬영하기
                        </button>
                    </div>*/}

                    {/* 수신인추가 */}
                    <div className="message-box send">
                        <div className="message-send-title">
                            <span>받는사람<b>*</b></span>
                            <button  className="message-btn-bring" onClick={onPopShow}>
                                + 수신인추가
                            </button>
                        </div>
                        
                        <ul className="message-send-box">
                            
                            {
                                currentData !== null && currentData !== undefined && Object.keys(currentData).length > 0 ? 
                                    
                                    currentData.msgReceiver.map((receiver, key)=> {
                                        return(
                                            <li key={key}>
                                                <span>{receiver.receiverName}({receiver.receiverRelation})</span>
                                                <button onClick={(e) => onReceiverDelete(e, receiver.receiverId)}>x</button>
                                            </li>
                                        )
                                    })
                                    
                                : <p>Loading...</p>
                            }

                        </ul>
                    </div>

                    {/* 버튼 박스 */}
                    <div className="message-box">
                        <div className="message-write-line"></div>
                            
                        <button className="message-btn grey" onClick={onTempSave}>임시저장</button>
                        <input className="message-btn orange" type="submit" value="작성완료" />

                    </div>
                </form>
                
                {/* 수신인 추가 팝업 */}
                <div className={`message-write-pop ${!popupVisible ? '' : 'show'}`}>
                    <button className="message-write-pop-dimed" onClick={onPopDimed}></button>
                    <div className="message-write-pop-box">
                        <div className="message-write-pop-head">
                            <span>받는사람</span>
                            <button className="message-btn-bring">+ 연락처 가져오기</button>
                        </div>

                        <div className="message-write-pop-div">
                            <div>이름<b>*</b></div>
                            <input type="text" name="receiverName" onChange={onChanged} value={inputValue.receiverName || ''} />
                        </div>
                        
                        <div className="message-write-pop-div">
                            <div>휴대폰번호<b>*</b></div>
                            <input type="text" name="receiverPhone" onChange={onChanged} value={inputValue.receiverPhone || ''} />
                        </div>

                        <div className="message-write-pop-div">
                            <div>수신인과의 관계<b>*</b></div>
                            <select name="receiverRelation" onChange={onChanged} value={inputValue.receiverRelation || '자녀'}>
                                <option value="자녀">자녀</option>
                                <option value="부인">부인</option>
                            </select>
                        </div>
                        <div className="message-write-pop-div">
                            <button className="message-btn grey" onClick={onPopDimed}>취소</button>
                            <button className="message-btn orange" onClick={onSavedReceivePerson}>저장</button>
                        </div> 
                    </div>
                    
                </div>
                
                
            </div>
            
        </div>
        </>
        
    );
};

export default MessageWrite;


