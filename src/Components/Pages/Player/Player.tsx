import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { youtube } from "../../Redux/Store";
import Song from "../../modal/Song";
import { Category } from "../../modal/Category";
import { addSongAction } from "../../Redux/SongReducer";
import { downloadCategoryAction } from "../../Redux/CategoriesReducer";

function Player(): JSX.Element {
  const { title, url } = useParams();
  const [songTitle, setTitle] = useState("");
  const [songDesc, setDesc] = useState("");
  const [songImg, setImage] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const apiKey = "AIzaSyBKQzeoMIHA942XqOho1fwPedksQ5fps2s";
  const apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=`;
  const videoURL = `https://www.youtube.com/watch?v=${url}`;

  useEffect(() => {
    if (youtube.getState().category.categories.length < 1) {
      axios
        .get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/catList"
        )
        .then((response) => response.data)
        .then((result) => {
          youtube.dispatch(downloadCategoryAction(result));
        });
    }
  }, []);

  const addSong = () => {
    console.log(videoURL);
    const songID = videoURL.split("=")[1];
    console.log(songID);
    axios
      .get(apiURL + songID)
      .then((response) => {
        const items = response.data.items;

        if (items && items.length > 0) {
          setTitle(items[0].snippet.channelTitle);
          setDesc(items[0].snippet.title);
          setImage(items[0].snippet.thumbnails.medium.url);
          console.log(items[0].snippet.title);
          setDialogOpen(true); // Open the dialog when song data is fetched
        } else {
          console.error("No items found in the response");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from YouTube API:", error);
      });
  };

  const handleAddSong = async () => {
    // Add your logic to handle adding the song
    console.log("Song added!");
    setDialogOpen(false);
    if (!selectedCategory) {
      alert("You must choose a category.");
      return;
    }

    const selectedCategoryObject = youtube
      .getState()
      .category.categories.find(
        (cat: Category) => cat.id === +selectedCategory
      );

    const newSong = new Song(
      songDesc,
      songImg,
      songTitle,
      videoURL,
      youtube.getState().songs.allSongs.length + 1,
      selectedCategoryObject ? selectedCategoryObject.id : 1,
      selectedCategoryObject ? selectedCategoryObject.name : "",
      false
    );

    console.log("New Song Data:", newSong);

    try {
      const id = (
        await axios.post(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/addSong",
          newSong
        )
      ).data;

      newSong.id = +id;
      youtube.dispatch(addSongAction(newSong));
      navigate("/home");
    } catch (error) {
      console.error("Error adding new song:", error);
    }
  };

  return (
    <Container className="Player">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>{title}</h1>
          <Button onClick={addSong} variant="contained" color="primary">
            Add Song
          </Button>
          <hr />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${url}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Grid>
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{songTitle}</DialogTitle>
        <DialogContent>
          <Select
            onChange={(args) => {
              setSelectedCategory(args.target.value);
            }}
            value={selectedCategory}
            required
            displayEmpty
            placeholder="Select category"
          >
            <MenuItem disabled value={""} aria-required>
              Select category
            </MenuItem>
            {youtube
              .getState()
              .category.categories.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
          <img src={songImg} alt={songTitle} />
          <p>{songDesc}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSong} color="primary">
            Add Song
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Player;
