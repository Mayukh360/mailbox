import React, { useState, useEffect } from 'react';
import './Inbox.css';

export default function Sentmail() {
  const [isVisible, setIsVisible] = useState(true);
  const enteredEmail = localStorage.getItem('email');
  const changedEmail = enteredEmail.replace('@', '').replace('.', '');
  const [emails, setEmails] = useState([
    { sender: 'sender1@example.com', subject: 'Email Subject 1', content: 'Email Content 1' },
    { sender: 'sender2@example.com', subject: 'Email Subject 2', content: 'Email Content 2' },
    { sender: 'sender3@example.com', subject: 'Email Subject 3', content: 'Email Content 3' },
    // Add more email objects as needed
  ]);

  const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);

  const toggleEmail = (index) => {
    setExpandedEmailIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mailbox-project-984db-default-rtdb.firebaseio.com/user/${changedEmail}.json`
        );
        const data = await response.json();
        if (response.ok) {
          const emailsData = Object.values(data);
          setEmails(emailsData);
          console.log(emailsData);
        }
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };

    fetchData();
  }, [changedEmail]);

  const hideBtnHandler = () => {
    setIsVisible(false);
  };

  return (
    <div className="inbox-container">
      {emails.map((email, index) => (
        <div
          key={index}
          className={`email-item ${expandedEmailIndex === index ? 'expanded' : ''}`}
          onClick={() => toggleEmail(index)}
        >
          <div className="email-header" onClick={hideBtnHandler}>
            {isVisible && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1C4.486 1 0 5.486 0 10c0 4.514 4.486 9 10 9s10-4.486 10-9c0-4.514-4.486-9-10-9zm0 16c-3.866 0-7-3.134-7-7 0-3.866 3.134-7 7-7s7 3.134 7 7c0 3.866-3.134 7-7 7zm4-9a4 4 0 11-8 0 4 4 0 018 0zm-8-2a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="email-sender">{email.enteredEmail}</span>
            <span className="email-subject">{email.subject}</span>
          </div>
          {expandedEmailIndex === index && (
            <div className="email-content">
              <span className="email-sender">{email.enteredEmail}</span>
              <span className="email-subject">{email.subject}</span>
              <p className="email-body">{email.emailContent}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
