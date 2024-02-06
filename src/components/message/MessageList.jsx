import React, { useState, useEffect } from 'react';
import usePageStore from '../utils/store.js'

const Message = (props) => {

    const {page, setPage} = usePageStore();
    const [test, setTest] = useState('');
    
    useEffect(()=> {
        setPage('Message');
    },[]);
    
    return(
        <>
           <div class="">

            </div> 
        </>
    );
};

export default Message;