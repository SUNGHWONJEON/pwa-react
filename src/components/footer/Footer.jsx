import React, { useState, useEffect } from 'react';


const Footer = () => {

    const [footerData, setFooterData] = useState([]);

    useEffect(() => {
        setFooterData([
            {
                title: '푸터1',
                link: ''
            },
            {
                title: '푸터2',
                link: ''
            },
            {
                title: '푸터3',
                link: ''
            }
        ])

    }, [])


    return(
        <footer>
            <ul>
                {
                    footerData.map((data, key) => {
                        return(
                            <li key={key}>
                                <a href={data.link}>{data.title}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </footer>
    )
}


export default Footer;