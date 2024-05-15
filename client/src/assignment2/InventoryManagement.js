import { useState, useEffect } from "react";
import { Navbar, Col, Row, Container, Button } from "react-bootstrap";
import { BsBootstrapFill } from "react-icons/bs";
import {
  Link,
  NavLink,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import style from "./TableComponent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InventoryManagement() {
  const [data, setData] = useState([]);
  const navigation = useNavigate();
  const [deleteButton, setDeteleButton] = useState(true);

  useEffect(() => {
    console.log("useEffect ");
    fetch(`http://localhost:5000/addInventory/getInventoryData`)
      .then((result) => result.json())
      .then((json) => {
        // setData(json.data);
        // console.log("data is", json.data);
        // json.data.map((item) => { console.log("item", item) })
        const transformedData = {};
        json.data.forEach((item) => {
          if (transformedData[item.name]) {
            if (Array.isArray(transformedData[item.name].skill)) {
              transformedData[item.name].skill.push(item.skill);
            } else {
              transformedData[item.name].skill = [
                transformedData[item.name].skill,
                item.skill,
              ];
            }
          } else {
            transformedData[item.name] = { name: item.name, skill: item.skill };
          }
        });
        const result = Object.values(transformedData);
        setData(result)
        console.log(result);
      });
  }, [deleteButton]);

//   const updateItem = (item) => {
//     console.log("updateItem", item);
//     navigation({
//       pathname: "addInventory",
//       search: createSearchParams({
//         name: item.name,
//         quantity: item.quantity,
//         image: item.image,
//         id: item._id,
//       }).toString(),
//     });
//   };

  const deleteItem = (item) => {
    console.log("deleteItem", item);
    fetch(`http://localhost:5000/addInventory/deleteRecord`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Private-Network": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDeteleButton(!deleteButton);
        console.log("res on deleteRecord", res.data);
      })
      .catch((e) => console.log("error", e));
  };

  return (
    <>
      <div>
        <div>
          <Navbar className="navigation-bar">
            <Container className="icon row">
              <BsBootstrapFill
                color="#563d7c"
                size={20}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              <Link className="padding" to="/home">
                Media Library
              </Link>
            </Container>
            <Link className="padding" to="/addInventory">
            Add Skill
            </Link>
            <Link className="padding" to="/inventory">
            User Details
            </Link>
            <Link className="padding" to="/profile">Profile</Link>
          </Navbar>
        </div>
        {data.length > 0 ? (
          <div className="table-section">
            <h1 className="users-content">USERS DETAILS</h1>
            <br />
            <table id="table" style={{ width: 600 }}>
              <thead>
                <tr>
                  <td>
                    <b> USER NAME</b>
                  </td>
                  <td>
                    <b>SKILLS OBTAINED</b>
                  </td>
                  {/* <td>
                    <b>DELETE</b>
                  </td>
                  <td>
                    <b>UPDATE</b>
                  </td> */}
                </tr>
                {data &&
                  data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        {Array.isArray(item.skill) ? (
                          <ul>
                            {item.skill.map((s, index) => (
                              <li key={index}>{s}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.skill}</p>
                        )}
                        {/* <td>
                          <Button
                            onClick={() => updateItem(item)}
                            className="addButton2"
                          >
                            Update
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              deleteItem(item);
                            }}
                            className="addButton2"
                          >
                            Delete
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
              </thead>
            </table>
          </div>
        ) : (
          <div className="popup-parent">
            {" "}
            <div className="popup">
              <h1>No data in the Database</h1>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
export default InventoryManagement;
