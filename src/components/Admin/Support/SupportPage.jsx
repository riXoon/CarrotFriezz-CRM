import React, { useEffect } from 'react'
import NavBar from '../../../shared/NavBar'
import Emails from './Emails'

const SupportPage = () => {

    /* useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                console.log('Google API script loaded.');
            };
            document.body.appendChild(script);
        };
        loadScript();
    }, []); */

  return (
    <div>
        <NavBar />
        <h1 className='font-bold text-2xl mt-6'>Support</h1>

        <Emails />

    </div>
  )
}

export default SupportPage