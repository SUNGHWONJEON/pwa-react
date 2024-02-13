import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { addressData } from "../../store/store";
import { BiAlarmAdd } from "react-icons/bi";


//수신자 목록
const ReceiverList = (props) => {
    const [receiverListData, setReceiverListData] = useState([]);

    useEffect(() => {
        setReceiverListData(props.msgReceiver.map((address, index) => ({
            ...address,
            toggleCheck: false
        })));

        console.log('>>>>>>>>>>>>>>>>>>receiverListData : ' + JSON.stringify(receiverListData));

    }, [props.msgReceiver])

    // const toggleChecked = (index) => {
    //     setData(prevData => {
    //         const newData = [...prevData]; // 기존 데이터를 복사하여 새로운 배열 생성
    //         newData[index] = {
    //             ...newData[index],
    //             checked: !newData[index].checked // toggleChecked 작동 방식에 따라 true 또는 false 설정
    //         };
    //         return newData; // 변경된 배열 반환
    //     });
    // };

    //수신인 목록 클릭했을때
    //토글 기능
    //여러개 체크 가능
    const onListClick = (e, idx) => {
        e.preventDefault();
        
        //receiverListData[idx].toggleCheck = !receiverListData[idx].toggleCheck;
        let newData = [...receiverListData]; // 기존 데이터를 복사하여 새로운 배열 생성
        newData[idx] = {
            ...newData[idx],
            toggleCheck: !newData[idx].toggleCheck 
        };

        setReceiverListData(newData);

        console.log('=====JSON.stringify(receiverListData) : ' + JSON.stringify(receiverListData));
        //1. 받는 사람 리스트에 저장하거나 
        //2. 메시지 받는 사람 리스트에 저장함

        //구분해야 함
        

    }

    const onAddReceiverMessage = (e) => {
        e.preventDefault();
        const tempData = receiverListData.filter(item => item.toggleCheck === true)
        .map(({ toggleCheck, ...rest }) => rest);
        
        props.onAddReceiver(tempData);
    }
    
    //메시지에 내가 선택한 수신인 등록 되게
    const onAddMessage = () => {
        //선택한 리스트 
    }

    return(
        <>
            {/* 수신인 목록일때 */}
            <div className={`message-send-container ${props.componentType === 'receiver' ? 'receiver' : ''}`}>

            
                <ul className="message-send-inbox">
                    {
                        receiverListData !== null && receiverListData !== undefined && receiverListData.length > 0 ?
                            receiverListData.map((receiver, key)=> {
                                return(
                                    <li key={key} className={`inbox-list ${!receiver.toggleCheck ? '' : 'toggleCheck'}`}>
                                        <button className="inbox-list-box inbox-list-box-btn" onClick={(e) => onListClick(e, key)}>
                                            <div className="inbox-list-textbox">
                                                <span className="inbox-receiver-name">{receiver.receiverName}({receiver.receiverRelation})</span>
                                                <span className="inbox-receiver-phone">{receiver.receiverPhone}</span>
                                            </div>
                                            <div className="inbox-list-textbox">
                                                <BiAlarmAdd />
                                                <span className="inbox-receiver-count"><b>{receiver.sendCount}</b>건</span>
                                            </div>
                                        </button>
                                        <div className="inbox-list-box">
                                            <button className="inbox-list-delete" onClick={(e) => props.onInboxReceiverDelete(e, receiver.receiverId)}><BiAlarmAdd /></button>
                                        </div>
                                    </li>
                                )
                            })
                        :''
                    }
                </ul>
                { 
                    props.componentType !== 'inbox' ? 
                        <>
                            <div className="inbox-btn-box">
                                <button className="message-btn orange" onClick={onAddReceiverMessage}>수신인등록</button> 
                            </div>
                        </>
                        
                    : '' 
                }
            </div>
        </>
    );
};

export default ReceiverList;