import "./Notepad.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Notepad = () => {
  const [songList, setSongList] = useState([
    { id: 1, songname: "Ishq Nachawe" },
    { id: 2, songname: "Kinni Kinni" },
    { id: 3, songname: "One Love" },
    { id: 4, songname: "Dandelions" },
  ]);

  const [playlist, setPlaylist] = useState([{ id: 1, songname: "Laado" }]);
  //   { id: 1, songname: "Laado" }

  function addToPlaylist(id) {
    const selectedSong = songList.find((song) => song.id === id);
    // console.log("sel song", selectedSong);
    if (selectedSong) {
      setPlaylist([...playlist, selectedSong]);
      setSongList((prevSongList) =>
        prevSongList.filter((song) => song.id !== id)
      );
    }

    // console.log("playlist", playlist);
  }

  function deleteFromPlaylist(id) {
    console.log("id", id);
    const songToDelete = playlist.filter((song) => song.id === id);
    console.log("songtodel", songToDelete);
  }

  return (
    <>
      <Header />
      <div className="notepad">
        <h3>Make your playlist</h3>
        <div className="content">
          <div className="songs">
            <h3>Check out song collection</h3>
            <ul className="list">
              {songList.map((song) => {
                return (
                  <div key={song.id} className="list-item">
                    <li>{song.songname}</li>
                    {/* <button>del</button> */}
                    <button onClick={() => addToPlaylist(song.id)}>add</button>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="playlist">
            <h3>Currently listening to</h3>
            <ul>
              {playlist &&
                playlist.map((song) => {
                  console.log("playlis  when redndeer", playlist);
                  return (
                    <div key={song.id} className="list-item">
                      <li>{song.songname}</li>
                      <button onClick={() => deleteFromPlaylist(song.id)}>
                        del
                      </button>
                      {/* <button onClick={() => addToPlaylist(song.id)}>
                        add
                      </button> */}
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
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
