import "./Notepad.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Notepad = () => {
  const [songList, setSongList] = useState([
    { id: 1, songname: "Ishq Nachawe" },
    { id: 2, songname: "Kinni Kinni" },
    { id: 3, songname: "One Love" },
    { id: 4, songname: "Espresso" },
    { id: 5, songname: "Shinunoga E-Wa" },
  ]);

  const [playlist, setPlaylist] = useState([
    // { id: 1, songname: "Somewhere Only We Know" },
  ]);

  const [newSong, setNewSong] = useState({
    songname: "",
  });

  function addToCollection(song) {
    console.log("new song", song);
    if (song.songname != "") {
      setSongList([...songList, newSong]);
      setNewSong({
        songname: "",
      });
    }
  }

  function addToPlaylist(id) {
    const selectedSong = songList.find((song) => song.id === id);
    if (selectedSong) {
      setPlaylist([...playlist, selectedSong]);
      setSongList((prevSongList) =>
        prevSongList.filter((song) => song.id !== id)
      );
    }
  }

  function deleteFromPlaylist(id) {
    const songToDelete = playlist.find((song) => song.id === id);
    setPlaylist(playlist.filter((song) => song.id !== id));
    setSongList([...songList, songToDelete]);
  }

  function deleteFromCollection(id) {
    setSongList(songList.filter((song) => song.id !== id));
  }

  return (
    <>
      <Header />
      <div className="notepad">
        <h3 className="notepad-title">Make your own Playlist</h3>
        <input
          className="input-bar"
          type="text"
          placeholder="Add new song to the collection..."
          value={newSong.songname}
          onChange={(e) =>
            setNewSong({ id: songList.length + 1, songname: e.target.value })
          }
        />
        <button
          style={{ padding: "6px 19px", fontSize: "14px" }}
          className="btn"
          onClick={() => addToCollection(newSong)}
        >
          Add
        </button>
        <div className="content">
          <div className="songs">
            <h3 className="card-heading">Check out song collection 🎶</h3>
            <ul className="list">
              {songList.map((song) => {
                return (
                  <div key={song.id} className="list-item">
                    <li className="li-value">{song.songname}</li>
                    <div className="btn-grp">
                      <button
                        title="Add to playlist"
                        className="btn"
                        onClick={() => addToPlaylist(song.id)}
                      >
                        <FaPlus />
                      </button>
                      <button
                        title="Delete from collection"
                        className="btn"
                        onClick={() => deleteFromCollection(song.id)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="playlist">
            <h3 className="card-heading">Currently listening to... 🎧</h3>
            <ul className="list">
              {playlist &&
                playlist.map((song) => {
                  return (
                    <div key={song.id} className="list-item">
                      <li className="li-value">{song.songname}</li>
                      <button
                        title="Delete from playlist"
                        className="btn"
                        onClick={() => deleteFromPlaylist(song.id)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      {/* footer */}
      <p className="love">
        Made with <FaHeart style={{ color: "#9b2323" }} /> by{" "}
        <a href="https://github.com/kleiry20" target="_blank">
          Anushka
        </a>
      </p>
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
