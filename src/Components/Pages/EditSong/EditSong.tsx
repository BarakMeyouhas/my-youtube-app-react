import { useNavigate, useParams } from "react-router-dom";
import "./EditSong.css";
import { useEffect, useState } from "react";
import Song from "../../modal/Song";
import { youtube } from "../../Redux/Store";
import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Cancel, Send } from "@mui/icons-material";
import axios from "axios";
import { updateSongAction } from "../../Redux/SongReducer";

function EditSong(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  if (params.id) {
    var songID: number = +params.id | 0;
  }

  const [song, setSong] = useState<Song>(
    youtube.getState().songs.allSongs.filter((item) => item.id === songID)[0]
  );

  const [selectedCategory, setSelectedCategory] = useState<number>(
    song?.category || 1
  );

  // Update the category when the dropdown value changes
  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    setSelectedCategory(event.target.value as number);
  };

  const updateSong = async () => {
    try {
      const updatedTitle =
        (document.getElementById("songTitle") as HTMLInputElement)?.value ||
        song.title;
      const updatedDescription =
        (document.getElementById("songDescription") as HTMLInputElement)
          ?.value || song.description;
      const updatedImg =
        (document.getElementById("songImage") as HTMLInputElement)?.value ||
        song.img;

      const updatedCategory = youtube
        .getState()
        .category.categories.find(
          (category) => category.id === selectedCategory
        );

      const updatedSong = {
        id: songID,
        title: updatedTitle,
        description: updatedDescription,
        img: updatedImg,
        category: selectedCategory,
        url: "",
        categoryName: updatedCategory ? updatedCategory.name : "",
        favorite: false,
      };

      console.log("Updated Song Object:", updatedSong);

      await axios.put(
        "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/updateSong",
        updatedSong
      );

      youtube.dispatch(updateSongAction(updatedSong));

      navigate(`/`);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <div className="EditSong">
      <div className="Box" style={{ width: 500 }}>
        <Typography variant="h3" className="HeadLine">
          Edit song
        </Typography>
        <hr />
        <br />
        Change the title
        <br />
        <TextField
          placeholder={song?.title}
          name="song title"
          variant="outlined"
          className="TextBox"
          id="songTitle"
        />
        <br />
        <br />
        Change the description
        <br />
        <TextField
          placeholder={song?.description}
          name="song description"
          variant="outlined"
          className="TextBox"
          id="songDescription"
        />
        <br />
        <br />
        Change the image
        <br />
        <TextField
          value={song?.img}
          name="song image"
          variant="outlined"
          className="TextBox"
          type="url"
          id="songImage"
        />
        <br />
        <br />
        Change the category
        <br />
        <br />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="outlined"
          className="TextBox"
        >
          {youtube.getState().category.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" startIcon={<Send />} onClick={updateSong}>
            Update
          </Button>
          <Button color="secondary" startIcon={<Cancel />}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default EditSong;
