import React, { useEffect, useState } from 'react';

const CLIENT_ID = '531009019031-6lc477c5oc8q0l7scthoicku5j7j6gb0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB0JtJPLVwAVqfxUvH7X2ti58uLIlGJ5RM'; // Replace with your actual API Key
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

function EmailsBackup() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const loadGapiScript = () => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                console.log('Google API script loaded.');
                initializeGapi();
            };
            document.body.appendChild(script);
        };

        const initializeGapi = () => {
            window.gapi.load('client:auth2', () => {
                window.gapi.client
                    .init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
                        scope: SCOPES,
                    })
                    .then(() => {
                        const authInstance = window.gapi.auth2.getAuthInstance();
                        setIsSignedIn(authInstance.isSignedIn.get());
                        authInstance.isSignedIn.listen(setIsSignedIn);
                    })
                    .catch((error) => console.error('Error initializing Google API client:', error));
            });
        };

        loadGapiScript();
    }, []);

    const handleSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    const fetchEmails = () => {
        window.gapi.client.gmail.users.messages
            .list({
                userId: 'me',
                maxResults: 10,
            })
            .then((response) => {
                const messages = response.result.messages || [];
                const emailPromises = messages.map((message) =>
                    window.gapi.client.gmail.users.messages.get({
                        userId: 'me',
                        id: message.id,
                    })
                );
                return Promise.all(emailPromises);
            })
            .then((results) => {
                const emailData = results.map((result) => ({
                    id: result.result.id,
                    snippet: result.result.snippet,
                }));
                setEmails(emailData);
            })
            .catch((error) => console.error('Error fetching emails:', error));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Gmail Integration</h1>
            {!isSignedIn ? (
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSignIn}
                >
                    Sign in with Google
                </button>
            ) : (
                <div>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded ml-4"
                        onClick={fetchEmails}
                    >
                        Fetch Emails
                    </button>
                    <div className="mt-4">
                        {emails.length > 0 ? (
                            emails.map((email) => (
                                <div key={email.id} className="border-b p-2">
                                    <p>{email.snippet}</p>
                                </div>
                            ))
                        ) : (
                            <p>No emails to display.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailsBackup;
