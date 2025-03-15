import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { fetchBankerData } from "../../queries/bankers/fetchBankerData";
import { deleteBankerData } from "../../queries/bankers/deleteBankerData";
import { useState, useEffect } from "react";

import UpdateBankerPopUp from "../../PopUps/UpdateBankerPopUp";
import BankerFillForm from "../../FillForms/bankerFillForm/bankerFillForm";

function Bankers() {
const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFetch = () => {
    fetchBankerData()
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
        deleteBankerData(id)
        .then((result) => {
          console.log(result);
          const newData = data.filter((item) => item.bankerId !== id);
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
        item[searchType]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredData(searchedData);
    } else {
      setFilteredData(data);
    }
  }, [searchText, searchType, data]);

  return (
    <>
      <header className="App-header">
        <h3>Bankers</h3>
        <BankerFillForm></BankerFillForm>
        <p></p>
        <div className="button-row">
          <DropdownButton
          variant="success"
            title="Sort by"
            id="bg-nested-dropdown"
            onSelect={handleSort}
          >
            <Dropdown.Item eventKey="firstName">first name</Dropdown.Item>
            <Dropdown.Item eventKey="lastName">last name</Dropdown.Item>
            <Dropdown.Item eventKey="creditAmount">department number</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
          variant="success"
            title="Search by"
            id="bg-nested-dropdown"
            onSelect={handleSearch}
          >
            <Dropdown.Item eventKey="firstName">first name</Dropdown.Item>
            <Dropdown.Item eventKey="lastName">last name</Dropdown.Item>
            <Dropdown.Item eventKey="creditAmount">department number</Dropdown.Item>
          </DropdownButton>
        </div>
        {sortType}------{searchType}
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Search text</Form.Label>
          <Form.Control
            type="text"
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
        </Form.Group>
        <p></p>
        <Button variant="success" onClick={handleFetch}>
          Fetch data
        </Button>
        <p></p>
        <ListGroup>
          {filteredData.map((el) => (
            <ListGroup.Item key={el.bankerId}>
              {el.firstName} {el.lastName} {el.departmentNumber}
              <div className="button-container">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(el.bankerId)}
                >
                  Delete
                </Button>
                <UpdateBankerPopUp
                  id={el.bankerId}
                  fn={el.firstName}
                  ln={el.lastName}
                  dn={el.departmentNumber}
                ></UpdateBankerPopUp>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </header>
    </>
  );
}

export default Bankers;
