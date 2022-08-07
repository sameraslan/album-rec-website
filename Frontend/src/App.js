import React, { Component, useState } from "react";
import "./App.css";
import axios from "axios";
import albumData from './album_data.json'
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchBar.css"

class Border extends Component {
  render() {
    return <div className="Border">{this.props.children}</div>;
  }
}

function enlargeArtworkUrl(url, size) {
  return url.replace(/\/100x100/, "/" + size + "x" + size);
}

function albumConstructor(album) {
  return (
      <Album
        // key={album.collectionId}
        coverArt={enlargeArtworkUrl(album.URL, 350)}
        title={album.Title}
        // year={album.releaseDate.slice(0,4)}
        artist={album.Artist}
        // trackCount={album.trackCount}
        // collectionPrice={album.collectionPrice}
        // collectionViewUrl={album.collectionViewUrl}
        albumURL={album.URL}
        albumId={album.URI}
        ordering={album.Order}
      />
  );
}

//"https://itunes.apple.com/lookup?collectionId="+this.props.albumId+""

function Album(props) {
  const data = props;
  return (
    <div style={{display: "inline-block", marginTop:"2%"}}>
      <div className="Number">{props.ordering !== 0 ? props.ordering : <></>}</div>
      <div className="Title">
            {data.title}
      </div>
      <Border>
        <img
          src={data.coverArt}
          className="CoverArt"
          alt={"Cover of " + data.title}
        />
      </Border>
      <div className="Artist"> {data.artist}</div>
    </div>
  );
}

function Search() {
  const [getMessage, setGetMessage] = useState({ results: [] });
  const [userInput, setUserInput] = useState("")
  
  const getAlbums = (title, artist) => {
    if (title.length === 0 || artist.length === 0) {
      setGetMessage({results: []})
    }
    else {
      const url =
        "http://127.0.0.1:5000/flask/getSimilar/" + title.replace(" ", "%20") + "/" + artist.replace(" ", "%20");
      console.log(url);
      axios
        .get(url)
        .then(response => {
          const res = JSON.parse(response.data.albums);
          console.log(res.results);
          setGetMessage({ results: res.results }); // Call as paremeter of function to deal with this stuff
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const clearInput = () => {
    setUserInput("")
  };

  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setUserInput(searchWord);
    const newFilter = albumData.filter((value) => {
        const titleAndArtist = value.Title.toLowerCase() + value.Artist.toLowerCase()
        return titleAndArtist.includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <>
      <div className="search">
        <div className="searchInputs">
          {/* <SearchBar placeholder="Enter an Album Title or Artist..." data={albumData} handleFunction={getAlbums}/> */}
          <div>
            <input onChange={e => handleFilter(e)} value={userInput} type={"text"} placeholder='Search By Album Title...' ></input>
              {userInput.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value) => {
                return (
                  <div onClick={() => {setUserInput(""); getAlbums(value.Title, value.Artist)}} className="dataDiv" target="_blank" >
                    <div className="dataItem">{value.Title} - {value.Artist}</div>
                  </div>
                );
              })}
            </div> 
            )}
          </div>
          
          <div className="searchIcon">
              {userInput.length === 0 ? (
                <SearchIcon fontSize="large"/>
              ) : (
                <CloseIcon onClick={clearInput}/>
              )}
          </div>
        </div>
      </div>
      <div>
        {getMessage.results.length > 0 ? (
          getMessage.results.slice(0, 1).map(album => {
            return albumConstructor(album);
          })
        ) : (
          <></>
        )}
      </div>
      <div>
        {getMessage.results.length > 0 ? (
          getMessage.results.slice(1).map(album => {
            return albumConstructor(album);
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

class App extends Component {
  render() {
    return (
      <div id="mydiv">
        <Search></Search>
      </div>
    );
  }
}

export default App;
