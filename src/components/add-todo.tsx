import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { AppDispatch } from "../redux/store";
import { addTodo } from "../redux/todo/todoSlice";

const AddTodo: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError(false); // Reset error when typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError(true);
    } else {
      dispatch(addTodo({ name, frequency }));
      setName("");
      setError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Activity Name"
          value={name}
          onChange={handleChange}
          placeholder="Enter activity name"
          fullWidth
          error={error}
          helperText={error ? "This field is required." : ""}
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </Box>
    </form>
  );
};

export default AddTodo;
