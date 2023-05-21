import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function LoggeinPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSendMail = async () => {
    // Logic to send the email
    const enteredEmail=localStorage.getItem('email');
    const emailContent = editorState.getCurrentContent().getPlainText();
    const changedemail = recipient.replace("@", "").replace(".", "");
    const changedSendereEmail=enteredEmail.replace("@", "").replace(".", "");
    console.log('Recipient:', recipient);
    console.log('Changed mail:', changedemail);
    console.log('Subject:', subject);
    console.log('Email Content:', emailContent);
    // You can implement your email sending functionality here
    const item={
      subject, emailContent,enteredEmail
    }

     fetch(`https://mailbox-project-984db-default-rtdb.firebaseio.com/user/${changedemail}.json`,{
      method :'POST',
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    })
    fetch(`https://mailbox-project-984db-default-rtdb.firebaseio.com/user/sent/${changedSendereEmail}.json`,{
      method :'POST',
      body: JSON.stringify({subject, emailContent,recipient}),
      headers: { "Content-Type": "application/json" },
    })
    setRecipient('');
    setSubject('');
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 my-6">
     
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Recipient Email:
        </label>
        <input
          type="text"
          value={recipient}
          onChange={handleRecipientChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="border border-gray-300 rounded">
        <Editor
          editorState={editorState}
          toolbarClassName="hidden"
          wrapperClassName="bg-white border-0 rounded p-3 focus:outline-none"
          editorClassName="w-full h-full"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      
      <button
        onClick={handleSendMail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Send
      </button>
    </div>
  );
}
