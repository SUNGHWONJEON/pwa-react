import React, { useState, useEffect } from 'react';
import { BiAlarmAdd } from "react-icons/bi";
import { BiAlarmExclamation } from "react-icons/bi";
import { BiAperture } from "react-icons/bi";
import { BiAlarmSnooze } from "react-icons/bi";
 
 
 
const HeaderNavi1 = () => {

    const [headerData, setHeaderData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const data = [
            {
                title: '메시지 관리',
                link: '/message',
                icon: <BiAlarmAdd className="react-m-icon" />,
                isActive: true
            },
            {
                title: '수신자 관리',
                link: '/inbox',
                icon: <BiAlarmExclamation className="react-m-icon" />,
                isActive: false
            },
            {
                title: '메시지 전송관리',
                link: '/send',
                icon: <BiAperture className="react-m-icon" />,
                isActive: false
            },
            {
                title: '내정보',
                link: '/myinfo',
                icon: <BiAlarmSnooze className="react-m-icon" />,
                isActive: false
            }
        ]
        setHeaderData(data);
        setIsMobile(true);
    }, []);

    return(
        <nav className="present-navi2">
            <ul>
                {
                    headerData.map((data, key) => {
                        return(
                            <li key={key}>
                                <a href={data.link} className={data.isActive ? 'active' : ''}
                                title="">
                                    <span className="btn-icon">{data.icon}</span>
                                    <span>{data.title}</span>
                                </a>
                            </li>
                        )
                    })
                }

            </ul>
            
        </nav>
    )
};

export default HeaderNavi1;