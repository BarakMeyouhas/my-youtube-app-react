import { useEffect, useState } from "react";
import { youtube } from "../../Redux/Store";
import "./MyFavorites.css";
import axios from "axios";
import { downloadFavoritesAction } from "../../Redux/SongReducer";
import SingleItem from "./SingleItem/SingleItem";
import { downloadCategoryAction } from "../../Redux/CategoriesReducer";
import { useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";

function MyFavorites(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const params = useParams();

  useEffect(() => {
    // Fetch favorite songs and categories
    const fetchData = async () => {
      try {
        const favoriteSongsResponse = await axios.get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/favoriteSongs"
        );
        youtube.dispatch(downloadFavoritesAction(favoriteSongsResponse.data));

        const categoryResponse = await axios.get(
          "https://my-youtube-app-database-a8a16796b967.herokuapp.com/api/v1/youtube/catList"
        );
        youtube.dispatch(downloadCategoryAction(categoryResponse.data));

        setRefresh(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const favoriteSongs = youtube.getState().songs.favoriteSongs;

  // Subscribe to changes in Redux state
  useEffect(() => {
    const unsubscribe = youtube.subscribe(() => {
      // Update local state when Redux state changes
      setRefresh((prev) => !prev);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="favorites-container">
      <Typography variant="h4" gutterBottom>
        My Favorite Songs
      </Typography>
      <Stack spacing={1} className="YouTube">
        {" "}
        {favoriteSongs.map((item) => {
          // Find the category information for the current song
          const categoryInfo = youtube
            .getState()
            .category.categories.find(
              (category) => category.id === item.category
            );

          return (
            <SingleItem
              key={item.id}
              url={item.url}
              category={item.category}
              categoryName={categoryInfo ? categoryInfo.name : ""}
              title={item.title}
              description={item.description}
              img={item.img}
              id={item.id}
              isFavorite={true}
            />
          );
        })}
      </Stack>
    </div>
  );
}

export default MyFavorites;
