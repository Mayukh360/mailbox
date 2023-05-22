import React, { useState,useEffect } from 'react';
import './Inbox.css'



export default function Inbox() {
    const [isVisible, setIsVisible]=useState(true);
    const enteredEmail=localStorage.getItem('email');
    const changedEmail=enteredEmail.replace("@", "").replace(".", "");
  const [emails, setEmails] = useState([
    // { id: 1, sender: 'sender1@example.com', subject: 'Email Subject 1', content: 'Email Content 1' },
    // { id: 2, sender: 'sender2@example.com', subject: 'Email Subject 2', content: 'Email Content 2' },
    // { id: 3, sender: 'sender3@example.com', subject: 'Email Subject 3', content: 'Email Content 3' },
    // Add more email objects as needed
  ]);

  const [expandedEmailId, setExpandedEmailId] = useState(null);

  const toggleEmail = (id) => {
    setExpandedEmailId((prevId) => (prevId === id ? null : id));
    console.log(id);
  };

  // Function to update emails dynamically
//   const updateEmails = (newEmails) => {
//     setEmails(newEmails);
//   };

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://mailbox-project-984db-default-rtdb.firebaseio.com/user/${changedEmail}.json`
      );
      const data = await response.json();
      console.log('DATA', data);

      if (response.ok) {
        const emailsData = Object.entries(data).map(([id, email]) => ({
          id: id, // Use the ID from the database as the id
          sender: email.enteredEmail,
          subject: email.subject,
          content: email.emailContent,
        }));
        setEmails(emailsData);
        console.log("Emails Data",emailsData);
      }
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }
  };

  fetchData();
}, [changedEmail]);


const hideBtnHandler=()=>{
 setIsVisible(false);
}

const dltbtnhandler = async (emailId) => {
  setEmails((prevEmail) => prevEmail.filter((email) => email.id !== emailId));
  console.log(emailId);

  try {
    const response = await fetch(
      `https://mailbox-project-984db-default-rtdb.firebaseio.com/user/${changedEmail}/${emailId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error deleting data from the database");
    }
  } catch (error) {
    console.error("Error deleting data from the database:", error);
  }
};

  return (
    <div className="inbox-container">
        
      {emails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${expandedEmailId === email.id ? 'expanded' : ''}`}
          onClick={() => toggleEmail(email.id)}
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
            <span className="email-sender">{email.sender
            }</span>
            <span className="email-subject">{email.subject}</span>
            <button onClick={()=>dltbtnhandler(email.id)} className="mr-6 px-2 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-800">X</button>
          </div>
          {expandedEmailId === email.id && (
            <div className="email-content">
              <span className="email-sender">{email.sender}</span>
              <span className="email-subject">{email.subject}</span>
              <p className="email-body">{email.content}</p>
            </div>
          )}
        </div>
      ))}
     </div>
  );
}