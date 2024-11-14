// src/components/Task.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

const Task = ({ task }) => {
    const [isChecked, setIsChecked] = useState(task.completed);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [commentsList, setCommentsList] = useState(task.comments || []); // Store comments

    const handleCheck = async () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        if (task.subTasks) {
            // If checking off a subtask
            if (newCheckedState) {
                // Show comment input when a subtask is checked off
                setShowCommentInput(true);
            } else {
                // If unchecking a subtask, you could handle logic here if needed
            }

            // Check if all subtasks are completed
            const allSubtasksCompleted = task.subTasks.every(subTask => subTask.completed || subTask.isChecked);

            // Update main task completion status in Firestore
            await setDoc(doc(db, 'tasks', task.id), { completed: allSubtasksCompleted }, { merge: true });
        } else {
            // If checking off the main task directly
            if (newCheckedState) {
                // Show comment input for main task only if no subtasks are checked
                if (!task.subTasks || task.subTasks.every(subTask => !subTask.isChecked)) {
                    setShowCommentInput(true);
                }
            }
        }
    };

    const handleCommentSubmit = async () => {
        // Add the new comment to the comments list
        const newComment = { text: comment, user: userName };
        const updatedCommentsList = [...commentsList, newComment];

        // Update Firestore with new comments
        await setDoc(doc(db, 'tasks', task.id), { comments: updatedCommentsList }, { merge: true });

        // Reset input fields and hide comment input
        setComment('');
        setUserName('');
        setShowCommentInput(false);

        // Update local state to show the new comment
        setCommentsList(updatedCommentsList);
    };

    return (
        <div style={{ marginBottom: '10px', paddingLeft: '20px' }}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheck} 
            />
            <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
                {task.name}
            </span>
            
            {/* Show comment input if required */}
            {showCommentInput && (
                <div>
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
            )}

            {/* Display existing comments */}
            <div>
                {commentsList.map((cmt, index) => (
                    <p key={index}><strong>{cmt.user}:</strong> {cmt.text}</p>
                ))}
            </div>

            {/* Render subtasks */}
            {task.subTasks && Array.isArray(task.subTasks) && task.subTasks.map((subTask) => (
                <Task key={subTask.id} task={subTask} />
            ))}
        </div>
    );
};

export default Task;