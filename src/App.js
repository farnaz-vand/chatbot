import React, { useEffect } from 'react';
import Chatbox from './components/chatbot.js';
import "./App.css";

export default function App() {
  useEffect(() => {
    if (!navigator.onLine) {
      alert("شما به اینترنت متصل نیستید.");
    }

    const handleOffline = () => {
      alert("شما به اینترنت متصل نیستید.");
    };

    const handleOnline = () => {
      console.log("اتصال اینترنت برقرار است.");
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []); 

  return (
    <div>
      <Chatbox/>
    </div>
  );
}
