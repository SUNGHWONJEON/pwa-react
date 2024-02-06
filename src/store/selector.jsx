import { selectorFamily } from 'recoil';
import { cameraStat } from './store.js';
import { messageData } from './store.js';

export const setCameraStat = selectorFamily({
    key: 'cameraStat',
    get: (params) => ({ get }) => {
        const stat = get(cameraStat);
        return stat;
    },
    set: (params) => ({ set, get }, newValue) => {
        const stat = get(cameraStat);
        
        set(cameraStat, [newValue, ...stat]) //-> create(insert) 성공      
    }
})

export const setMessageData = selectorFamily({
    key: 'messageData',
    get: (params) => ({ get }) => {
        const message = get(messageData);
        return message;
    },
    set: (params) => ({ set, get }, newValue) => {
        const message = get(messageData);

        set(messageData, newValue) //-> create(insert) 성공      
    }
})