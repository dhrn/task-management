import "./App.css";
// App.js
import { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Components/types";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: import.meta.env.PROJECTID,
  storageBucket: import.meta.env.STORAGEBUCKET,
  messagingSenderId: import.meta.env.MESSAGINGSENDERID,
  appId: import.meta.env.APPID,
  measurementId: import.meta.env.MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData: Task[] = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (newTask: Task) => {
    await setDoc(doc(db, "tasks", uuidv4()), newTask);
  };

  const updateTask = async (taskId: string, updatedTask: Task) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedTask);
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      <TaskForm addTask={addTask} />
      {!tasks.length ? "No Tasks Found, Click Add Task Button" : null}
      {tasks.length ? (
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ) : null}
    </div>
  );
};

export default App;
