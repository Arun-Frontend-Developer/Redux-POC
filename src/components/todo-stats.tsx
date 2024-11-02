import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTodos, Todo } from "../redux/todo/todoSlice";

const TodoStats: React.FC = () => {
  const { todos, isLoading, error } = useSelector(
    (state: RootState) => state.todos
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const getTotalTodos = () => todos.length;

  const getCompletedToday = () => {
    const today = new Date().toLocaleDateString().split("T")[0];
    return todos.filter((todo) => todo.completedDates.includes(today)).length;
  };

  const getLongestStreak = () => {
    const getStreak = (todo: Todo) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toLocaleDateString().split("T")[0];
        if (todo.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    return Math.max(...todos.map(getStreak), 0);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tracker Statistics
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">Total Todos: {getTotalTodos()}</Typography>
        <Typography variant="body1">
          Completed Today: {getCompletedToday()}
        </Typography>
        <Typography variant="body1">
          Longest Streak: {getLongestStreak()} days
        </Typography>
      </Box>
    </Paper>
  );
};

export default TodoStats;
