import React, { useState, useEffect } from 'react';

const HomeTop = () => {

    const [presentName, setPresentName] = useState('홍길동');


    useEffect(() => {

    }, [])

    return(
        <header>
            <div className="presents-header">
                {/* <img src="img/test.webp"></img> */}
                <div className="presents-header-box">
                    {presentName}<br/>
                    소중한 분들께<br/>
                    남기고 싶으신<br/>
                    말씀을 전해드립니다.
                </div>
            </div>
            
        </header>
    )
}

export default HomeTop;
