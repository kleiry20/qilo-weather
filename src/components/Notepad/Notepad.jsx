import "./Notepad.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Notepad = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(
          "https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=coldplay"
        );
        console.log(response);
        setTracks(response.data.results);
      } catch (error) {
        console.error("Error fetching tracks", error);
      }
    };

    // fetchTracks();
  }, []);

  return (
    <>
      <Header />
      <div className="notepad">
        <h3>Make your playlist</h3>
        <div className="content">
          <div className="songs">
            <h3>Check out song collection</h3>
            <ul className="list">
              <div className="list-item">
                <li>Ishq nachawe</li>
                <button>del</button>
                <button>add</button>
              </div>
              <div className="list-item">
                <li>Ishq nachawe</li>
                <button>del</button>
                <button>add</button>
              </div>
              <div className="list-item">
                <li>Ishq nachawe</li>
                <button>del</button>
                <button>add</button>
              </div>
              <div className="list-item">
                <li>Ishq nachawe</li>
                <button>del</button>
                <button>add</button>
              </div>
            </ul>
          </div>
          <div className="playlist">
            <h3>Currently listening to</h3>
          </div>
        </div>

        {/* <div>
          <h1>Music Player</h1>
          {tracks.length > 0 && (
            <ul>
              {tracks.map((track) => (
                <li key={track.id} onClick={() => setCurrentTrack(track.audio)}>
                  {track.name} - {track.artist_name}
                </li>
              ))}
            </ul>
          )}
          {currentTrack && (
            <audio controls autoPlay>
              <source src={currentTrack} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Notepad;

const Header = () => {
  return (
    <div className="header">
      <p>Anushka Singh</p>
      <div className="contact">
        <a href="mailto:anushkasingh801@gmail.com">Mail</a>
        <a href="tel:+918707319547">Contact No</a>
        <a href="/">Home</a>
      </div>
    </div>
  );
};
