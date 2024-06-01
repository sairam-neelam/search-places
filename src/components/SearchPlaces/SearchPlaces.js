import React, { useState, useEffect, useRef } from "react";
import apiServices from "../../services/apiServices";
import Pagination from "../Pagination/Pagination";
import "./SearchPlaces.css";
import useDebounce from "../../hooks/useDebounce";

const SearchPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const itemsPerPage = 5;

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "l") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    const payload = {};
    if (debouncedSearchTerm) payload.namePrefix = debouncedSearchTerm;
    if (itemsPerPage) payload.limit = itemsPerPage;
    if (currentPage) payload.offset = (currentPage - 1) * itemsPerPage;
    setLoading(true);
    apiServices
      .fetchPlaces(payload)
      .then((data) => {
        setPlaces(data?.data);
        setTotalCount(data?.metadata.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [debouncedSearchTerm, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-places-container">
      <h1>Search Places</h1>
      <div className={`input-container ${isLoading && "input-disabled"}`}>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Search Places"
          onChange={onChangeInput}
        />
        <p className="tab">ctrl + l</p>
      </div>

      {isLoading && <div className="spinner"></div>}
      {places.length > 0 ? (
        <table className="places-table">
          <thead className="header">
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {places.map((city) => (
              <tr key={city.id}>
                <td>{city.id}</td>
                <td>{city.name}</td>
                <td>
                  <img
                    src={`https://flagcdn.com/48x36/${city.countryCode.toLowerCase()}.png`}
                    alt={city.countryCode}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Results Found</p>
      )}

      <Pagination
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPlaces;
