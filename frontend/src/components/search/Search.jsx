import React, { useState } from "react";
import { amazon_search } from "../../utils";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchTxt, setSearchTxt] = useState();
  const SearchHandler = () => {
    navigate(`/search/${searchTxt}`);
  };
  return (
    <div className=" items-center hidden ss:flex flex-grow">
      <div className="flex items-center w-full h-10">
        <div className="bg-gray-300 px-3 h-full flex rounded-l-md items-center">
          <span className="text-gray-700">All</span>
        </div>

        <div className="h-full flex-grow">
          <input
            type="text"
            className="h-full w-full px-2 text-black"
            placeholder="Search Amazon.in"
            onChange={(e) => setSearchTxt(e.target.value)}
            value={searchTxt}
          />
        </div>
        <div
          className="w-8 bg-amazonYellow  flex items-center h-full cursor-pointer rounded-r-md"
          onClick={SearchHandler}
        >
          <img src={amazon_search} width="100%" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Search;
