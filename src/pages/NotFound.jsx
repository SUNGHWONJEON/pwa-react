import React, { useEffect } from 'react';
import usePageStore from '../utils/storePage.js'



const NotFound = () => {

    const {page, setPage} = usePageStore();
    
    useEffect(()=> {
        setPage('NotFound');
    },[]);
    
    return(
        <>
            <div>낫파운드</div>
        </>
    );
};

export default NotFound;