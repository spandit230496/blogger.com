import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function EditBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const blogid = useParams().id;

  const blogDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/blog//get-blog/${blogid}`
      );
      console.log(response.data);
      setInputs({
        title: response.data.blog.title,
        description: response.data.blog.description,
        image: response.data.blog.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => blogDetails, []);
  const id = localStorage.getItem("userId");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target; // Access the form element using event.target
    const data = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      image: form.elements.image.value,
      user: id,
    };
    console.log(data);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/blog/update-blog/${blogid}`,
        data
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/blogs");
      }
      console.log(data);
    } catch (error) {
      console.error("Post Creation failed:", error);
      alert("Post Creation failed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Edit Post
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Blog Title"
                name="title"
                value={inputs.title} // Corrected prop value
                autoFocus
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="image"
                label="image"
                type="text"
                value={inputs.image}
                onChange={handleChange}
                id="image"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Post
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
