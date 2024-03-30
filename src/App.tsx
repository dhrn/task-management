import "./App.css";
// App.js
import { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
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
import { db } from "./firebase";
import Profile from "./Components/Profile";

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
      <Profile />
      <h1>
        Task Management Application
      </h1>
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
