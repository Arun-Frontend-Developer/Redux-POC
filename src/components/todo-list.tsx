import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, LinearProgress, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { removeTodo, Todo, toggleTodo } from "../redux/todo/todoSlice";
import { RootState, AppDispatch } from "../redux/store";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toLocaleDateString().split("T")[0];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {todos.map((todo) => (
        <Paper key={todo.id} elevation={2} sx={{ p: 2 }}>
          <Grid container>
            <Grid size={4}>
              <Typography variant="h6">{todo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {todo.frequency.charAt(0).toUpperCase() +
                  todo.frequency.slice(1)}
              </Typography>
            </Grid>
            <Grid size={8}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    todo.completedDates.includes(today) ? "success" : "primary"
                  }
                  onClick={() =>
                    dispatch(toggleTodo({ id: todo.id, date: today }))
                  }
                  startIcon={<CheckCircleIcon />}
                >
                  {todo.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeTodo(todo.id))}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current Streak: {getStreak(todo)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(todo) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TodoList;
