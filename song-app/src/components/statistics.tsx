import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Statistics } from "./style/confifureSongFormStyle";

const SongStatistics: React.FC= () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const statistics = songs.reduce(
    (acc, song) => {
      acc.albums.add(song.album);
      acc.artists.add(song.artist);
      acc.genres.add(song.genre);
      return acc;
    },
    { albums: new Set(), artists: new Set(), genres: new Set() }
  );

  return (
    <Statistics>
        <p>Albums: {statistics.albums.size}</p>
        <p>Artists: {statistics.artists.size}</p>
        <p>Genres: {statistics.genres.size}</p>
    </Statistics>
  );
};

export default SongStatistics;
