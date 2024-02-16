import React, { useState } from "react";
import "./SearchBar.css";
import { BsMicFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SearchList from "./SearchList";
function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchList, setsearchList] = useState(false);
  const TitleArray = [
    "video 1",
    "video 2",
    "animation video 1",
    "animation video 2",
  ].filter((q) => q.toUpperCase().includes(searchQuery.toUpperCase()));
  return (
    <>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="search_div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search "
              value={searchQuery}
              onChange={(e) => setsearchQuery(e.target.value)}
              onClick={(e) => setsearchList(true)}
            />
            <FaSearch
              className="searchIcon_SearchBar"
              onClick={(e) => setsearchList(false)}
            />
            <BsMicFill className="Mic_SearchBar" />
            {searchQuery && searchList && (
              <SearchList setSearchQuery={setsearchQuery} TitleArray={TitleArray} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
