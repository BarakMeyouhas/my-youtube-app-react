import { useState, useEffect } from "react";
import "./AddSongForm.css";
import axios from "axios";
import Song from "../../modal/Song";
import { useNavigate } from "react-router-dom";
import { youtube } from "../../Redux/Store";
import { addSongAction } from "../../Redux/SongReducer";
import { downloadCategoryAction } from "../../Redux/CategoriesReducer";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Category } from "../../modal/Category";

function AddSongForm(): JSX.Element {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (youtube.getState().category.categories.length < 1) {
      axios
        .get("https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/catList")
        .then((response) => response.data)
        .then((result) => {
          youtube.dispatch(downloadCategoryAction(result));
          setRefresh(true);
        });
    }
  }, []);

  const [songURL, setURL] = useState("");
  const [songTitle, setTitle] = useState("");
  const [songDesc, setDesc] = useState("");
  const [songImg, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const apiKey = "AIzaSyBKQzeoMIHA942XqOho1fwPedksQ5fps2s";
  const apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${apiKey}&id=`;

  const searchSong = () => {
    const songID = songURL.split("=")[1];
    axios.get(apiURL + songID).then((response) => {
      setTitle(response.data.items[0].snippet.channelTitle);
      setDesc(response.data.items[0].snippet.title);
      setImage(response.data.items[0].snippet.thumbnails.medium.url);
      console.log(response.data.items[0].snippet.title);
    });
  };

  const addNewSong = async () => {
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
      songURL,
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
    <div className="AddSongForm">
      <Typography variant="h4" gutterBottom>
        Add new song
      </Typography>
      <hr />
      <TextField
        type="url"
        label="Song URL"
        variant="outlined"
        onKeyUp={(e) => setURL((e.target as HTMLInputElement).value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={searchSong}
        style={{ height: "56px" }}
      >
        Search
      </Button>
      <br />
      <br />
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
        {youtube.getState().category.categories.map((category: Category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      <hr />
      <img src={songImg} alt={songTitle} />
      <br />
      <h2>{songTitle}</h2>
      <br />
      <hr />
      <h3>{songDesc}</h3>
      <br />
      <hr />

      <Button variant="contained" color="primary" onClick={addNewSong}>
        add song
      </Button>
    </div>
  );
}

export default AddSongForm;
