
import React, { useState, useEffect } from 'react';
import googleapis from 'googleapis';

const SendMessage = () => {
    const [sendMsg, setSendMsg] = useState([]);
    const serviceAccountKeyFile = 'path/to/serviceAccountKey.json';
    // SMS를 보낼 핸드폰 번호
    const phoneNumber = '+8201082789969'; // 실제 핸드폰 번호로 변경해야 합니다.
    const message = '문자보내기 테스트 ';
    

    const sendSMS = async () => {
        // const text = '문자보내기\nSMS SEND TEST';
        // const phoneNumber = '01082789969'; // 전화번호
        // const url = 'sms:' + phoneNumber + (checkMobile() === 'ios' ? '&' : '?') + 'body=' + encodeURIComponent(text);
        // window.location.href = url;


        try {
            // 인증 및 API 초기화
            const auth = new google.auth.GoogleAuth({
              keyFile: serviceAccountKeyFile,
              scopes: ['https://www.googleapis.com/auth/androidmessages'],
            });
            const authClient = await auth.getClient();
            google.options({ auth: authClient });
        
            // SMS 보내기
            const androidmessages = google.androidmessages('v1');
            const response = await androidmessages.messages.send({
                requestBody: {
                    sendMessagesRequest: {
                        message: {
                            text: message,
                            phoneNumber: phoneNumber,
                        },
                    },
                },
            });
        
            console.log('SMS sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending SMS:', error.message);
        }
    }

    return(
        <>
            <button onClick={sendSMS}>---메시지 보내기---</button>
        </>
    );
};

export default SendMessage;












