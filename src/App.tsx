import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddTodo from "./components/add-todo";
import TodoList from "./components/todo-list";
import TodoStats from "./components/todo-stats";

function Copyright() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} DailyTracker. All rights reserved.
      </Typography>
    </Box>
  );
}
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Container maxWidth="md">
          <Typography
            sx={{ mt: 2, mb: 3, fontWeight: "bold" }}
            variant="h4"
            component="h4"
            gutterBottom
            align="center"
          >
            Daily Tracker
          </Typography>
          <Grid container spacing={2}>
            <Grid size={8}>
              <AddTodo />
              <TodoList />
            </Grid>
            <Grid size={4}>
              <TodoStats />
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </Box>
    </Provider>
  );
};

export default App;
