import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { addressData } from "../store/store";
import ReceiverAdd from '../components/message/ReceiverAdd';
import HeaderTop from '../components/header/HeaderTop';

//수신자 목록을 저장해야 할 부분
const MessageInbox = () => {
    const [addressDataOrigin, setAddressDataOrigin] = useRecoilState(addressData);
    const [inputValue, setInputValue] = useState({});
    const [receiverData, setReceiverData] = useState({});

    useEffect(() => {
    }, [])

    //input값이 바뀔때마다 value값 저장
    const onChanged = (val) => {
        console.log('val : ' + val);
        setInputValue((prevValues) => ({
            ...prevValues,
            [val.name]: val.value
        }))
    }

    //얘는 따로 있어야 함 - 수신자 목록이 따로!!!
    //받는 사람 저장
    const onSavedReceivePerson = (receiver) => {

        //만약 같은 이름이나 전화번호가 있다면 추가 안되게
        //currentData.msgReceiver에 이미 receiver의 핸드폰 번호가 있으면 추가하지 않기
        
        const filteredReceiver = receiver.filter(item => !addressDataOrigin.find(exist => exist.receiverPhone === item.receiverPhone));
        let updateInboxReceiver = [...addressDataOrigin, ...filteredReceiver];
        setAddressDataOrigin(updateInboxReceiver);
        console.log('수신목록 저장하기 인박스!!! updateInboxReceiver : ' + updateInboxReceiver);
    }


    return(
        <>
            <HeaderTop />
            <div className="message-wrapper">
                <div className="message-container">
                    
                    <ReceiverAdd inputValue={inputValue} componentType={'inbox'}
                        setInputValue={setInputValue} onChanged={onChanged} onSavedReceivePerson={onSavedReceivePerson}/>
                </div>
            </div>
        </>
    );
};

export default MessageInbox;