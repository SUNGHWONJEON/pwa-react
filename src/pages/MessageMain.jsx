import React, { useState, useEffect } from 'react';
import { BiAlarmAdd } from "react-icons/bi";
import { BiAlarmExclamation } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { messageData } from "../store/store";
import HeaderTop from "../components/header/HeaderTop";
import Loading from '../components/common/Loading';

const MessageMain = (props) => {

    const [btnList, setBtnList] = useState([]);
    const [message, setMessage] = useRecoilState(messageData);

    useEffect(()=> {
        setBtnList([
            {
                title: '글작성',
                icon: '',
                link: '/message/write'
            }
            /*,
            {
                title: '촬영하기',
                icon: '',
                link: '/message/picture'
            },
            {
                title: '첨부하기',
                icon: '',
                link: '/message/attatch'
            }
            */
        ])
        
        console.log('==message : ', JSON.stringify(message));
    },[]);

    const onMessageDelete = (id) => {

        if(window.confirm('메시지를 삭제하시겠습니까?')) {
            const updateList = message.msgList.filter(item => item.msgId !== id);
            const updateMessage = {
                ...message,
                msgList: updateList
            }
            console.log('message : ' + JSON.stringify(message));
            console.log('updateMessage : ' + JSON.stringify(updateMessage));
            setMessage(updateMessage);
            
        }
    }

    const checkMobile = () => {
        var UA = navigator.userAgent.toLowerCase(); //userAgent 체크
        if ( UA.indexOf('android') > -1) {
            //Android
            return "android";
        } else if ( UA.indexOf("iphone") > -1 || UA.indexOf("ipad") > -1 || UA.indexOf("ipod") > -1 ) {
            //IOS
            return "ios";
        } else {
            //Android, IOS 외
            return "other";
        }
    }

    
    
    return(
        <>
            <HeaderTop />
            <div className="message-wrapper message-main">
                <ul className="message-main-btnlist">
                    {
                        btnList !== undefined && btnList !== null && btnList.length > 0 ?
                            btnList.map((btn, key) => {
                                return(
                                    <li key={key}>
                                        <a href={btn.link} className="">
                                            <BiAlarmAdd className="react-b-icon"/>
                                            <span className="">{btn.title}</span>
                                        </a>
                                    </li>
                                )
                            })
                        : <Loading />
                    }
                    
                </ul>

                {/* 리스트 */}
                <ul className="message-main-list">
                    {
                        message !== undefined && message !== null && message ? 
                            
                            message.msgList !== undefined && message.msgList !== null && message.msgList.length > 0 ? 
                                message.msgList.map((msg, key) => {
                                    return(
                                        <li key={key}>
                                            <a href={`/message/write/${key}`}>
                                                <div className="msg-list-box img-box">
                                                    <img className="msg-list-thumbnail" src={`img/${msg.msgAttach.length > 0 ? msg.msgAttach[0].attachName : ''}`} />
                                                </div>
                                                
                                                <div className="msg-list-box">
                                                    <div className="msg-list-text first-text">{msg.msgText}</div>
                                                    <div className="msg-list-text">
                                                        <span><BiAlarmAdd /></span>
                                                        <span>수신자 <b>{msg.msgReceiver ? msg.msgReceiver.length : 0}명</b></span>
                                                    </div>
                                                    <div className="msg-list-text">{msg.crateDate}</div>
                                                </div>
                                            </a>
                                            <button className="msg-list-box delete" onClick={() => onMessageDelete(msg.msgId)}>
                                                <BiAlarmExclamation />
                                            </button>
                                            
                                        </li>
                                    )
                                }) 
                            : <Loading />
                        : <Loading />
                    }

                </ul>
            </div>
            
        </>
    );
};

export default MessageMain;