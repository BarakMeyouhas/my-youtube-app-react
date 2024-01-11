import "./SearchSingleItem.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Paper } from "@mui/material";
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
  onSongClick: (videoURL: string) => void; // Add callback prop
}

function SearchSingleItem(props: itemProps): JSX.Element {
  const navigate = useNavigate();

  const handleSongClick = () => {
    const videoId = props.url.split("=")[1];
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

    // Pass the videoURL to onSongClick callback
    props.onSongClick(videoURL);

    // Navigate to the Player component with videoURL as a parameter
    navigate(
      `/player/${props.title}/${videoId}?videoURL=${encodeURIComponent(
        videoURL
      )}`
    );
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
          <div onClick={handleSongClick}>
            <img src={props.img} width={200} alt={props.title} />
          </div>
          <div>
            {props.title}
            <hr />
            {props.description}
            <hr />
            Category: {props.categoryName} <br />
            <br />
          </div>
        </Paper>
      </Box>
    </Grid>
  );
}

export default SearchSingleItem;
