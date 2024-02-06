import React, { useState, useEffect } from 'react';
import HeaderNavi1 from './HeaderNavi1';
import HeaderNavi2 from './HeaderNavi2';
import HomeTop  from './HomeTop';

const Header = () => {

    return(
        <div className="header-container">
            <HomeTop />
            <HeaderNavi2 />
            {/* <HeaderNavi1 /> */}
        </div>
    )
}


export default Header;