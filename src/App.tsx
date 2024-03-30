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
  apiKey: "AIzaSyDNOnDLReXbSAHH-J50z1px6YtpIFVwhj0",
  authDomain: "pesto-test.firebaseapp.com",
  projectId: "pesto-test",
  storageBucket: "pesto-test.appspot.com",
  messagingSenderId: "280831376182",
  appId: "1:280831376182:web:cfc032b584f76968bd5197",
  measurementId: "G-H2DPGBZTPZ",
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
