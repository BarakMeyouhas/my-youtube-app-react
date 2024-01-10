// SingleItem.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleItem.css";
import { youtube } from "../../../Redux/Store";
import {
  deleteSongAction,
  updateFavoriteStatusAction,
} from "../../../Redux/SongReducer";
import {
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

interface itemProps {
  url: string;
  title: string;
  description: string;
  img: string;
  category: number;
  categoryName: string;
  id: number;
  isFavorite: boolean;
}

function SingleItem(props: itemProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const response = await axios.get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com//api/v1/youtube/favoriteSongs"
        );
        const favoriteSongs = response.data;
        setIsLiked(
          favoriteSongs.some((song: { id: number }) => song.id === props.id)
        );
      } catch (error) {
        console.error("Error fetching favorite songs:", error);
      }
    };

    fetchFavoriteSongs();
  }, [props.id]);

  const deleteSong = async () => {
    try {
      await axios.delete(
        `https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/deleteSongById/${props.id}`
      );
      youtube.dispatch(deleteSongAction(props.id));
      navigate(`/deleteSong/${props.title}`);
    } catch (error) {
      console.error("Error deleting song:", error);
    } finally {
      handleClose();
    }
  };

  const handleLikeClick = async () => {
    try {
      setIsLiked(!isLiked);
      await axios.put(
        `https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/updateFavoriteStatus/${props.id}`,
        { favorite: !isLiked }
      );
      youtube.dispatch(
        updateFavoriteStatusAction({
          ...props,
          favorite: !isLiked,
        })
      );
    } catch (error) {
      console.error(
        `Error updating favorite status for song with id ${props.id}:`,
        error
      );
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className="SingleItem"
      sx={{ mb: 2 }}
    >
      <Box sx={{ mr: 4 }}>
        <Paper elevation={0} sx={{ ml: 2, padding: 1 }}>
          <div
            onClick={() =>
              navigate(`/player/${props.title}/${props.url.split("=")[1]}`)
            }
          >
            <img src={props.img} width={200} alt={props.title} />
          </div>
          <div>
            {props.title}
            <hr />
            {props.description}
            <hr />
            Category: {props.categoryName} <br />
            <br />
            <IconButton color="secondary" onClick={handleLikeClick}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Chip
              label="Delete"
              deleteIcon={<DeleteIcon />}
              onClick={handleOpen}
              variant="outlined"
            />
            <Chip
              label="Edit"
              onClick={() => {
                navigate(`/editSong/${props.id}`);
              }}
            />
          </div>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this song?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#555555" }}>
            Cancel
          </Button>
          <Button
            onClick={deleteSong}
            style={{ color: "#ffffff", backgroundColor: "#e57373" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default SingleItem;
