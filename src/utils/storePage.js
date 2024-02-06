// zustand의 create를 사용하여 store를 생성.
import {create} from 'zustand'

//create 안에는 기본값을 갖는 state를 설정 , 함수명 형식으로 변경할 state에 대해 작성.
//set()은 상태를 변경하는 메서드

// state를 false => true로 바꿔주고자 할때
export const usePageStore = create((set) => ({
    page: 'Home',
    setPage: (val) => set({ page: val }),
}));

/*
const useNumberBaseStore = create()((set, get) => ({
    numberA: 0, // store state
    numberB: 0, // store state
    // numberA 증가 함수
    increaseNumberA: () =>
        set((state) => ({
            numberA: state.numberA + 1, // state를 이용하여 state 값 변경
        })),
    // numberB 증가 함수
    increaseNumberB: (value) =>
        set({
            numberB: get().numberB + value, // get을 이용하여 state 값 변경
        }),
}));

export default useNumberBaseStore;
*/


export default usePageStore;