import {createBrowserRouter, useLoaderData, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MessageMain from '../pages/MessageMain';
import MessagePicture from '../pages/MessagePicture';
import MessageWrite from '../pages/MessageWrite';
import MessageAttach from '../pages/MessageAttach';
import MessageInbox from '../pages/MessageInbox';


export let router = createBrowserRouter([ 
    {
        path: '/',
        loader: () => ({message: 'Hello Data Router!'}),
        Component() {
            const data = useLoaderData();
            const navigate = useNavigate(); // link와 달리 특정 이벤트 발생시거나 특정 동작을 행해야 할때 navigate( '/이동경로', { state: { 키: 값, 키: 값, ... } } )
            return <Home />;
        }
        
    },
    {
        path: 'message',
        element: <MessageMain />,
    },
    {
        path: 'message/picture',
        element: <MessagePicture />,
    },
    {
        path: 'message/write/:pageNum?',
        element: <MessageWrite />,
    },
    {
        path: 'message/attatch',
        element: <MessageAttach />,
    },
    {
        path: 'inbox',
        element: <MessageInbox />,
    }
]);

{/* <div className="App">
      <div className="main-wrapper">
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/present_message" element={<Message pagePath="message_main" />} />
            <Route path="/present_message_write" element={<Message pagePath="message_write" />} />
            <Route path="/present_message_picture" element={<Message pagePath="message_picture" />} />
            <Route path="/present_message_attach" element={<Message pagePath="message_attach" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    </div> */}