import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderTop = () => {

    const [title, setTitle] = useState('타이틀');
    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1)
    }

    return(
        <header>
            <div className="header-top-box">
                <div className="header-top-title">{title}</div>
                <button className="header-btn-back" onClick={onBack}>
                    이전
                </button>
            </div>
            
        </header>
    )
}


export default HeaderTop;