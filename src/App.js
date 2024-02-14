
import { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from './router/router';
import './assets/style/style.scss';



function App() {

    return (
        <>
            <RouterProvider router={router} fallbackElement={<h1>Loading....</h1>}/>
            
        </>
        
    );
}

export default App;
