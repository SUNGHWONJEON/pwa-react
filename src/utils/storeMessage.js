// zustand의 create를 사용하여 store를 생성.
import {create} from 'zustand'

//create 안에는 기본값을 갖는 state를 설정 , 함수명 형식으로 변경할 state에 대해 작성.
//set()은 상태를 변경하는 메서드

// state를 false => true로 바꿔주고자 할때
export const useMessageStore = create((set) => ({
    message: {
        
    },
    contact: {

    },
    setMessage: (val) => set({ message: val }),
    setContact: (val) => set({ contact: val }),
}));


export default useMessageStore;