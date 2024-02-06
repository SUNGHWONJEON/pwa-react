import React, { useState, useEffect } from 'react';
import usePageStore from '../utils/storePage.js'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import axios from 'axios';

const Home = () => {

    const {page, setPage} = usePageStore();
    const [test, setTest] = useState('');
    
    useEffect(()=> {
        setPage('Home');
        
        axios.get('/api/test/hello')
        .then(function(response) {
            setTest(response.data);
            console.log(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    },[]);
    
    return(
        <>
            <Header />
            <div className="main-wrapper">
                <div className="main-container">test : {test}</div>
            </div>
            <Footer />
        </>
    );
};

export default Home;