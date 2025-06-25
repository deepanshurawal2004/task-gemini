// src/components/TaskList.tsx
import React, { useEffect } from "react";
import fetchTasks from "../api/fetchTasks";

const TaskList = () => {
  useEffect(() => {
    fetchTasks();
  }, []);

  return <div>Check console for task data!</div>;
};

export default TaskList;
