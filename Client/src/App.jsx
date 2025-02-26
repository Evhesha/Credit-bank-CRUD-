import "./App.css";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from 'react-bootstrap/Form';

import { fetchData } from "./queries/fetchData";
import { deleteData } from "./queries/deleteData";

import { useState, useEffect } from "react";

import FillForm from "./fillForm/fillForm";
import ListGroup from "react-bootstrap/ListGroup";
import UpdatePopUp from "./PopUps/UpdatePopUp";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFetch = () => {
    fetchData()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure, that you want to delete the record?") === true) {
      deleteData(id)
        .then((result) => {
          console.log(result);
          const newData = data.filter((item) => item.creditRecordId !== id);
          setData(newData);
          setFilteredData(newData);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleSort = (sortKey) => {
    setSortType(sortKey);
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortKey === "firstName" || sortKey === "lastName") {
        return a[sortKey].localeCompare(b[sortKey]);
      } else {
        return a[sortKey] - b[sortKey];
      }
    });
    setFilteredData(sortedData);
  };

  const handleSearch = (sortKey) => {
    setSearchType(sortKey);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (searchText && searchType) {
      const searchedData = data.filter((item) =>
        item[searchType].toString().toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(searchedData);
    } else {
      setFilteredData(data);
    }
  }, [searchText, searchType, data]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit bank</h1>
        <p></p>
        <FillForm></FillForm>
        <p></p>
        <DropdownButton
          title="Sort by"
          id="bg-nested-dropdown"
          onSelect={handleSort}
        >
          <Dropdown.Item eventKey="firstName">first name</Dropdown.Item>
          <Dropdown.Item eventKey="lastName">last name</Dropdown.Item>
          <Dropdown.Item eventKey="creditAmount">credit amount</Dropdown.Item>
          <Dropdown.Item eventKey="interestRate">interest rate</Dropdown.Item>
        </DropdownButton>
        {sortType}
        <p></p>
        <DropdownButton
          title="Search by"
          id="bg-nested-dropdown"
          onSelect={handleSearch}
        >
          <Dropdown.Item eventKey="firstName">first name</Dropdown.Item>
          <Dropdown.Item eventKey="lastName">last name</Dropdown.Item>
          <Dropdown.Item eventKey="creditAmount">credit amount</Dropdown.Item>
          <Dropdown.Item eventKey="interestRate">interest rate</Dropdown.Item>
        </DropdownButton>
        {searchType}
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Search text</Form.Label>
          <Form.Control
            type="text"
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
        </Form.Group>
        <p></p>
        <Button variant="primary" onClick={handleFetch}>
          Fetch data
        </Button>
        <p></p>
        <ListGroup>
          {filteredData.map((el) => (
            <ListGroup.Item key={el.creditRecordId}>
              {el.firstName} {el.lastName} {el.creditAmount} {el.interestRate}
              <div className="button-container">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(el.creditRecordId)}
                >
                  Delete
                </Button>
                <UpdatePopUp
                  id={el.creditRecordId}
                  fn={el.firstName}
                  ln={el.lastName}
                  ca={el.creditAmount}
                  ir={el.interestRate}
                ></UpdatePopUp>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </header>
    </div>
  );
}

export default App;
