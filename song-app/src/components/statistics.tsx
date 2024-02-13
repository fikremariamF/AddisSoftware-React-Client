import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Container} from './style/songListStyle';

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

  // Display statistics
  return (
    <Container>
      {/* Existing components */}
      <div>
        <h3>Statistics</h3>
        <p>Number of Albums: {statistics.albums.size}</p>
        <p>Number of Artists: {statistics.artists.size}</p>
        <p>Number of Genres: {statistics.genres.size}</p>
      </div>
      {/* Existing components continued */}
    </Container>
  );
};

export default SongStatistics;
