import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HeaderNavi1 = () => {

    const [headerData, setHeaderData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const data = [
            {
                title: '메시지',
                link: '/present_message',
                isActive: true
            },
            {
                title: '수신함',
                link: '/present_inbox',
                isActive: false
            },
            {
                title: '내정보',
                link: '/present_myinfo',
                isActive: false
            },
            {
                title: '고객센터',
                link: '/present_service',
                isActive: false
            }
        ]
        setHeaderData(data);
        setIsMobile(true);
    }, []);

    return(
        <nav className="present-navi">
            <Swiper
                spaceBetween={isMobile ? 0 : 25}
                slidesPerView={isMobile ? 3 : 3}
                slidesPerGroup={isMobile ? headerData.length : 3}
                navigation={false}
              >
                {
                    headerData.map((data, key) => {
                        return(
                            <SwiperSlide key={key}>
                                <a href={data.link} className={data.isActive ? 'active' : ''}
                                title="보험 메뉴가 선택되었습니다.">{data.title}</a>
                            </SwiperSlide>
                        )
                    })
                }
                


              </Swiper>

            {/*
            <div className="swiper-container swiper-container-horizontal">
                <div className="navWrap swiper-wrapper">
        
                    
        

      <a href="/mobile/insurance/product/MIN_SM00000_P10000.do" className="swiper-slide js-active swiper-slide-active" title="보험 메뉴가 선택되었습니다.">보험</a>
      <a href="/mobile/finance/loan/MFN_LNTGD000_P10000.do" className="swiper-slide swiper-slide-next">대출</a>
      <a href="/mobile/finance/fund/MFN_FUAFU00_P10000.do" className="swiper-slide">펀드</a>
      <a href="/mobile/finance/trust/MFN_TRTG000_P10000.do" className="swiper-slide">신탁</a>
      <a href="/static/mobile/finance/retirement/MRP_RPIF000_P10000.htm" className="swiper-slide">퇴직연금</a>
                </div>
                <span className="bgR"></span>
            </div>
             */}
        </nav>
    )
};

export default HeaderNavi1;