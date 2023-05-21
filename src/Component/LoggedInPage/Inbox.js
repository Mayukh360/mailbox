import React, { useEffect, useState } from "react";

export default function Inbox() {
  const [emails, setEmails] = useState([]);

  const enteredEmail = localStorage.getItem("email");
  const changedEmail = enteredEmail.replace("@", "").replace(".", "");

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
        }
      } catch (error) {
        console.error("Error fetching data from the database:", error);
      }
    };

    fetchData();
  }, [changedEmail]);

  return (
    <div>
      <h1>Inbox</h1>
      {emails.map((email, index) => (
        <ul key={index}>
          <li>
            <h3>Subject :{email.subject}--- Email Content :{email.emailContent} ---- Sender's Email id :{email.enteredEmail}</h3>
            
          </li>
        </ul>
      ))}
    </div>
  );
}
