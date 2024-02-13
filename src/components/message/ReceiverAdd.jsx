import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { addressData } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ReceiverList from "./ReceiverList";

//수신인 추가 팝업
const ReceiverAdd = (props) => {
    const navigate = useNavigate();
    const [addressDataOrigin, setAddressDataOrigin] = useRecoilState(addressData);
    const [popupVisible, setPopupVisible] = useState(false);
    const [componentType, setComponentType] = useState(props.componentType);
    const [visibleReceiverList, setVisibleReceiverList] = useState(false);

    useEffect(() => {
        console.log('componentType : ' + componentType);
    }, [])

    const onChangedValue = (e) => {
        const {name, value} = e.target;
        console.log('name : ' + name);
        console.log('value : ' + value);
        props.onChanged({name, value});
    }

    const onPopDimed = () => {
        setPopupVisible(false);
    }

    //팝업 보이게
    const onPopShow = (e) => {
        e.preventDefault();
        setPopupVisible(true);
        props.setInputValue({
            receiverName: '',
            receiverPhone: '',
            receiverRelation: '',
        })
    }

    //받는 사람 저장
    const saveAll = (data) => {
        setPopupVisible(false);

        if(data !== undefined && data !== null && data && data.length > 0) {
            //핸드폰번호가 같으면 주소 목록엔 반영안되기
            const filteredData = data.filter(item => !addressDataOrigin.find(exist => exist.receiverPhone === item.receiverPhone));
            setAddressDataOrigin([...addressDataOrigin, ...filteredData]);
            console.log('>>filteredData : ' + JSON.stringify(filteredData));
            console.log('>>addressDataOrigin : ' + JSON.stringify(addressDataOrigin));
            console.log('>>data : ' + JSON.stringify(data));
            props.onSavedReceivePerson(data);//받는 사람 저장
        }
        
        
    }

    //1. 받는 사람 직접입력하여 저장
    const onSavedReceivePerson = (e) => {
        
        //받는사람
        let receiver = {
            receiverId: Date.now(),
            receiverName: props.inputValue.receiverName,
            receiverRelation: props.inputValue.receiverRelation || '자녀',
            receiverPhone: props.inputValue.receiverPhone,
            isDelete: false,
            sendCount: 0
        }
        
        console.log('receiver : ' + JSON.stringify(receiver));
        saveAll([receiver]);//받는 사람 저장
    }
    
    //2. 받는 사람 수신인리스트에서 등록
    const onAddReceiver = (tempData) => {
        //localStorage.removeItem('recoil-persist');//저장되어 있는 값 초기화
        console.log('============tempData : ' + JSON.stringify(tempData));
        if(tempData !== null && tempData !== undefined && tempData && tempData.length > 0) {
            saveAll(tempData);//받는 사람 저장
        }
        
    }

    //수신인 리스트에서 삭제
    const onInboxReceiverDelete = (e, id) => {
        e.preventDefault();
        if(window.confirm('삭제하시겠습니까?')) {
            const filteredData = addressDataOrigin.filter(item => item.receiverId !== id);
            setAddressDataOrigin(filteredData);
            console.log('?? filteredData : ' + JSON.stringify(filteredData));
            console.log('?? addressDataOrigin : ' + JSON.stringify(addressDataOrigin));

        }else {

        }
        
    }

    const onVisibleReceiverList = () => {
        setVisibleReceiverList(!visibleReceiverList);
    }
    
    
    return(
        <>
            {/* 수신인추가버튼 */}
            <div className={`message-box send ${componentType === 'inbox' ? 'inbox' : ''}`}>
                <div className="message-send-title">
                    <span>{componentType === 'inbox' ? '수신자 목록' : '받는사람'}<b>*</b></span>
                    <button  className="message-btn-bring" onClick={onPopShow}>
                        + 수신인추가
                    </button>
                    {
                        componentType !== 'inbox' ? 
                        <button className="message-btn-bring" onClick={onVisibleReceiverList}>+ 수신인 목록에서 추가</button>
                        : ''
                    }
                </div>
            </div>
            
            {/* 수신인 추가 팝업 */}
            <div className={`message-write-pop ${!popupVisible ? '' : 'show'}`}>
                
                <button className="message-write-pop-dimed" onClick={onPopDimed}></button>
                <div className="message-write-pop-box">
                    <div className="message-write-pop-head">
                        <span>받는사람</span>
                        {/* <button className="message-btn-bring">+ 연락처 가져오기</button> */}
                    </div>

                    <div className="message-write-pop-div">
                        <div>이름<b>*</b></div>
                        <input type="text" name="receiverName" onChange={onChangedValue} value={props.inputValue.receiverName || ''} />
                    </div>
                    
                    <div className="message-write-pop-div">
                        <div>휴대폰번호<b>*</b></div>
                        <input type="text" name="receiverPhone" onChange={onChangedValue} value={props.inputValue.receiverPhone || ''} />
                    </div>

                    <div className="message-write-pop-div">
                        <div>수신인과의 관계<b>*</b></div>
                        <select name="receiverRelation" onChange={onChangedValue} value={props.inputValue.receiverRelation || '자녀'}>
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

            {/* 리스트 */}
            {
                componentType === 'inbox' ? 
                    <ReceiverList componentType={componentType} msgReceiver={addressDataOrigin} onAddReceiver={onAddReceiver} onInboxReceiverDelete={onInboxReceiverDelete}/> :
                    visibleReceiverList ? 
                        <ReceiverList componentType={componentType} msgReceiver={addressDataOrigin} onAddReceiver={onAddReceiver} onInboxReceiverDelete={onInboxReceiverDelete}/>
                    : ''
            }

            
        </>
    )
}

export default ReceiverAdd;