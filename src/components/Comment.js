// src/components/Comment.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { doc, updateDoc } from 'firebase/firestore';

const Comment = ({ taskId }) => {
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');

    const handleCommentSubmit = async () => {
        if (comment && userName) {
            // Update the task document with the new comment
            await updateDoc(doc(db, 'tasks', taskId), {
                comments: [...(task.comments || []), { text: comment, user: userName }]
            });
            setComment('');
            setUserName('');
        }
    };

    return (
        <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <textarea 
                placeholder="Add your comments here..." 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                rows="3" 
                style={{ width: '100%' }}
            />
            <input 
                type="text" 
                placeholder="Your name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                style={{ marginTop: '5px', width: '100%' }}
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
    );
};

export default Comment;