// src/api/fetchTasks.ts
const fetchTasks = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
    const data = await response.json();
    console.log("Tasks:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export default fetchTasks;
