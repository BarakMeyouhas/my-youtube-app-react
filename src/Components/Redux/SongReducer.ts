import Song from "../modal/Song";

//state of songs
export class SongState {
  public allSongs: Song[] = [];
  public favoriteSongs: Song[] = [];
}

//what action i will use....
export enum SongActionType {
  addSong = "addSong",
  deleteSong = "deleteSong",
  searchSong = "searchSong",
  downloadSongs = "downloadSongs",
  updateSong = "updateSong",
  downloadFavorites = "downloadFavorites",
  updateFavoriteStatus = "updateFavoriteStatus",
}

//action data structure
export interface SongAction {
  type: SongActionType;
  payload?: any;
}

//which function i will dispatch
export function addSongAction(newSong: Song): SongAction {
  return { type: SongActionType.addSong, payload: newSong };
}

export function deleteSongAction(id: number): SongAction {
  return { type: SongActionType.deleteSong, payload: id };
}

export function searchSongAction(songName: string): SongAction {
  return { type: SongActionType.searchSong, payload: songName };
}

export function downloadSongsAction(allSongs: Song[]) {
  return { type: SongActionType.downloadSongs, payload: allSongs };
}

export function updateSongAction(updatedSong: Song): SongAction {
  return { type: SongActionType.updateSong, payload: updatedSong };
}

export function downloadFavoritesAction(favoriteSongs: Song[]) {
  return { type: SongActionType.downloadFavorites, payload: favoriteSongs };
}

export function updateFavoriteStatusAction(song: Song): SongAction {
  return { type: SongActionType.updateFavoriteStatus, payload: song };
}

//reducer - we must use the function signature
export function SongReducer(
  currentState: SongState = new SongState(),
  action: SongAction
): SongState {
  const newState = { ...currentState };

  switch (action.type) {
    case SongActionType.addSong:
      newState.allSongs = [...newState.allSongs, action.payload];
      break;

    case SongActionType.deleteSong:
      newState.allSongs = newState.allSongs.filter(
        (item) => item.id !== action.payload
      );
      return newState;

    case SongActionType.searchSong:
      newState.allSongs = [...newState.allSongs].filter((item) =>
        item.title.includes(action.payload)
      );
      break;

    case SongActionType.downloadSongs:
      newState.allSongs = action.payload;
      break;

    case SongActionType.downloadFavorites:
      // Only update the favorites when downloading favorites
      newState.favoriteSongs = action.payload;
      break;

    case SongActionType.updateFavoriteStatus:
      // Update the favoriteSongs array
      newState.favoriteSongs = action.payload.favorite
        ? [...newState.favoriteSongs, action.payload]
        : newState.favoriteSongs.filter(
            (song) => song.id !== action.payload.id
          );
      break;

    case SongActionType.updateSong:
      // Find the index of the song to be updated
      const index = currentState.allSongs.findIndex(
        (song) => song.id === action.payload.id
      );
      // If the song is found, create a new array with the updated song
      if (index !== -1) {
        const updatedSongs = [...currentState.allSongs];
        updatedSongs[index] = action.payload;
        // Return the updated state
        return {
          ...currentState,
          allSongs: updatedSongs,
        };
      }
      // If the song is not found, return the current state
      return currentState;

    default:
      return currentState;
  }

  return newState;
}
