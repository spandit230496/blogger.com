import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  createdAt,
  username,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/blog/delete-blog/${id}`
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/myblogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: "80% ",
        margin: " 5rem auto",
        background: "smoke",
        border: "1px solid black",
      }}
      lg={{
        width: "30% ",
        margin: " 5rem auto",
        background: "smoke",
        border: "1px solid black",
      }}
      className="blog"
    >
      {isUser && (
        <div>
          <IconButton onClick={() => handleEdit()}>
            <ModeEdit />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => handleDelete()} />
          </IconButton>
        </div>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
