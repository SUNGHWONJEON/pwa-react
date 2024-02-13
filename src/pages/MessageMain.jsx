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
            },
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
        ])
        
        console.log('==message : ', JSON.stringify(message));
    },[]);
    
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
                                                <div className="msg-list-box delete">
                                                    <BiAlarmExclamation />
                                                </div>
                                            </a>
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