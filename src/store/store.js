import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const cameraStat = atom({
    key:'cameraStat',
    default:"",
    effects_UNSTABLE: [persistAtom],
})

export const messageData = atom({
    key: 'messageData',
    default: {
        userId: '1',
        userName: '홍길동',
        userPhone: '010-4444-4444',

        msgList: [
            {
                msgId: '1',
                msgSaved: 'temp',
                msgText: '아들, 딸 잘지내라',
                crateDate: '2023.05.30 11:32:34',
                modifyDate: '',
                deleteDate: '',
                msgReceiver: [
                    {
                        receiverId: '100002',
                        receiverName: '박길동',
                        receiverRelation: '손자',
                        receiverPhone: '010-1234-5678',
                        isDelete: false,
                        sendCount: 2
                    },
                    {
                        receiverId: '1000302',
                        receiverName: '박상균',
                        receiverRelation: '자녀',
                        receiverPhone: '010-1234-5678',
                        isDelete: false,
                        sendCount: 1
                    }

                ],
                msgAttach: [
                    {
                        attachSize: '1234',
                        attachType: 'video',
                        attachName: 'est.webp',
                    },
                    {
                        attachSize: '5678',
                        attachType: 'image',
                        attachName: 'image5678',
                    },
                    {
                        attachSize: '9999',
                        attachType: 'audio',
                        attachName: 'audio5678',
                    }
                ]
            },
            {
                msgId: '2',
                msgSaved: 'saved',
                msgText: '우리 아이를 잘 부탁합니다.',
                crateDate: '2023.05.30 11:32:34',
                modifyDate: '',
                deleteDate: '',
                msgReceiver: [
                    {
                        receiverId: '10003024',
                        receiverName: '홍순이',
                        receiverRelation: '고모',
                        receiverPhone: '010-1234-5678',
                        isDelete: false,
                        sendCount: 2
                    },
                    {
                        receiverId: '100030245',
                        receiverName: '홍돌이',
                        receiverRelation: '삼촌',
                        receiverPhone: '010-1234-5678',
                        isDelete: false,
                        sendCount: 1
                    }
                ],
                msgAttach: [
                    {
                        attachSize: '1234',
                        attachType: 'video',
                        attachName: 'test.webp',
                    },
                    {
                        attachSize: '5678',
                        attachType: 'image',
                        attachName: 'image5678',
                    },
                    {
                        attachSize: '9999',
                        attachType: 'audio',
                        attachName: 'audio5678',
                    }
                ]
                
            },
            {
                msgId: '3',
                msgSaved: 'saved',
                msgText: '당신 고생많았어요.',
                crateDate: '2023.05.30 11:32:34',
                modifyDate: '',
                deleteDate: '',
                msgReceiver: [
                    {
                        receiverId: '1000302451',
                        receiverName: '홍복자',
                        receiverRelation: '부인',
                        receiverPhone: '010-1234-5678',
                        isDelete: false,
                        sendCount: 2
                    }
                ],
                msgAttach: [
                    {
                        attachSize: '1234',
                        attachType: 'video',
                        attachName: 'video1234',
                    },
                    {
                        attachSize: '5678',
                        attachType: 'image',
                        attachName: 'image5678',
                    },
                    {
                        attachSize: '9999',
                        attachType: 'audio',
                        attachName: 'audio5678',
                    }
                ]
                
            }
        ]
    },
    effects_UNSTABLE: [persistAtom],
})


