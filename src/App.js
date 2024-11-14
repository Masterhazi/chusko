// src/App.js
import React, { useEffect, useState } from 'react';
import Task from './components/Task';
import Login from './components/Login';
import Register from './components/Register'; // Import Register component
import { db } from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false); // State to toggle between login and register
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksCollection = collection(db, 'tasks');
            const taskSnapshot = await getDocs(tasksCollection);
            const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(taskList);
        };

        if (isLoggedIn) {
            fetchTasks();
        }
    }, [isLoggedIn]);

    return (
        <div>
            {!isLoggedIn ? (
                showRegister ? (
                    <Register onRegister={() => setIsLoggedIn(true)} /> // Show registration form
                ) : (
                    <Login onLogin={() => setIsLoggedIn(true)} />
                )
            ) : (
                <>
                    <h1>Fake Job Posting Prediction Checklist</h1>
                    {tasks.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                    <button onClick={() => setShowRegister(!showRegister)}>
                        {showRegister ? "Already have an account? Log In" : "Don't have an account? Register"}
                    </button>
                </>
            )}
        </div>
    );
}

export default App;

