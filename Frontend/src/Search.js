import axios from "axios";
import React, { useState, useRef } from "react";
import { enlargeArtworkUrl, albumConstructor } from "./Album";
import albumData from "./album_data.json";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ColorThief from "colorthief";
import { Slider } from "@mui/material";
import "./Search.css";
import "./App.css";

function rgb(values) {
    return "rgb(" + values.join(", ") + ")";
}

function Search() {
    const [getMessage, setGetMessage] = useState({ results: [] });
    const [userInput, setUserInput] = useState("");
  
    const getAlbums = (title, artist) => {
      if (title.length === 0 || artist.length === 0) {
        setGetMessage({ results: [] });
      } else {
        const url =
          "http://127.0.0.1:5000/flask/getSimilar/" +
          title.replace(" ", "%20") +
          "/" +
          artist.replace(" ", "%20");
        console.log(url);
        axios
          .get(url)
          .then((response) => {
            const res = JSON.parse(response.data.albums);
            console.log(res.results);
            setGetMessage({ results: res.results }); // Call as paremeter of function to deal with this stuff
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  
    const clearInput = () => {
      setUserInput("");
    };
  
    const [filteredData, setFilteredData] = useState([]);
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setUserInput(searchWord);
      const newFilter = albumData.filter((value) => {
        const titleAndArtist =
          value.Title.toLowerCase() + value.Artist.toLowerCase();
        return titleAndArtist.includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const [firstAlbumRendered, setFirstAlbumRendered] = useState(false);
  
    const divRef = useRef(null);
    const divSearchIconRef = useRef(null);
    const inputRef = useRef(null)
    const searchIconRef = useRef(null)
  
    const imgRef = React.createRef();
    const colorRef = useRef("");
  
    return (
      <>
        <div className="search">
          <div className="searchInputs">
            <div>
              <input
                ref={inputRef}
                onChange={(e) => {
                  handleFilter(e);
                }}
                value={userInput}
                type={"text"}
                placeholder="Search By Album Title/Artist..."
              ></input>
              {userInput.length != 0 && (
                <div id="dataResult" className="dataResult">
                  {filteredData.slice(0, 15).map((value) => {
                    return (
                      <div
                        className="dataDiv"
                        onClick={() => {
                          setUserInput("");
                          setFirstAlbumRendered(false);
                          setGetMessage({ results: [] })
                          getAlbums(value.Title, value.Artist);
                        }}
                        target="_blank"
                      >
                        <div className="dataItem">
                          {value.Title} - {value.Artist}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div ref={divSearchIconRef} className="searchIcon">
              {userInput.length === 0 ? (
                <SearchIcon ref={searchIconRef} fontSize="large" />
              ) : (
                <CloseIcon onClick={clearInput} />
              )}
            </div>
          </div>
        </div>
        {/* <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAreaValueText={"Yelao"}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
            /> */}
        { getMessage.results.length > 0 ? (
          <div style={{ display: "inline-block", marginTop: "2%" }}>
            <div className="Title">
              {getMessage.results.length > 0 ? getMessage.results[0].Title : ""}
            </div>
              <div ref={divRef} id="Border" className="Border">
                <img
                  src={
                    getMessage.results.length > 0
                      ? enlargeArtworkUrl(getMessage.results[0].URL, 350)
                      : ""
                  }
                  ref={imgRef}
                  className="CoverArt"
                  alt={
                    getMessage.results.length > 0
                      ? "Cover of " + getMessage.results[0].Title
                      : ""
                  }
                  onLoad={() => {
                    const colorThief = new ColorThief();
                    const img = imgRef.current;
                    img.crossOrigin = "Anonymous";
                    const palette = colorThief.getPalette(img, 5);
                    divRef.current.style.backgroundColor = rgb(palette[1]);
                    setFirstAlbumRendered(true);
  
                    // Set page css based on main album color palette
                    colorRef.current = rgb(palette[1]);
                    divSearchIconRef.current.style.borderColor = rgb(palette[1])
                    inputRef.current.style.borderColor = rgb(palette[1])
                    searchIconRef.current.style.color = rgb(palette[1])
                    
  
                    document.body.style.backgroundImage = "linear-gradient("+rgb(palette[0])+ ", " + rgb(palette[1]) + ")"
                  }}
                />
              </div>
            <div className="Artist">
              {" "}
              {getMessage.results.length > 0 ? getMessage.results[0].Artist : ""}
            </div>
          </div> ) : <></> }
        {firstAlbumRendered ? (
          <div>
            {getMessage.results.length > 0 ? (
              getMessage.results.slice(1).map((album) => {
                return albumConstructor(album, colorRef);
              })
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
}

export { Search }