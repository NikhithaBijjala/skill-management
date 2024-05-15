import { useState, useEffect } from "react";
import { Navbar, Col, Row, Container, Button } from "react-bootstrap";
import { BsBootstrapFill } from "react-icons/bs";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import style from "./TableComponent.css";
import axios from "axios";

function AddInventory() {
  var userDetails = JSON.parse(window.sessionStorage.getItem("token"));

  // const { name, quantity, image } = props
  const [searchParams] = useSearchParams();
  const n = searchParams.get("name");
  const q = searchParams.get("quantity");
  const i = searchParams.get("image");
  const id = searchParams.get("id");
  console.log("data", n, q, i, id);
  // const [name1, setName1] = useState(n ?? "");
  const [skill, setSkill] = useState("");
  const [dbSkills, setDbSkills] = useState();
  const [suggestedSkills, setSuggestedSkills] = useState();
  const [skills, setSkills] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    console.log("session", userDetails);
  }, [userDetails]);

  useEffect(() => {
    console.log("useEffect ");
    fetch(`http://localhost:5000/addInventory/getInventoryData`)
      .then((result) => result.json())
      .then((json) => {
        console.log("json data", json);
        const aggregatedSkills = [];
        json.data.forEach((item) => {
          if (!aggregatedSkills) {
            aggregatedSkills = [];
          }
          aggregatedSkills.push(item);
        });
        setDbSkills(aggregatedSkills);
        setSuggestedSkills(aggregatedSkills);
        console.log("aggre", aggregatedSkills);
        aggregatedSkills.map((item) => console.log("item", item));
      });
  }, []);

  const addDocumentToCollection = () => {
    fetch(`http://localhost:5000/addInventory/addRecord`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Private-Network": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDetails.userName,
        skill: skill,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res on addRecord", res.data);
        navigation("/inventory");
      })
      .catch((e) => console.log("error", e));
  };
  const handleSkillChange = (event) => {
    const value = event.target.value;
    setSkill(value);
    if (!value) {
      setSuggestedSkills(dbSkills);
    } else {
      console.log("nik", suggestedSkills, "nik");
      const filteredSkills = suggestedSkills.filter((skill) =>
        skill.skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedSkills(filteredSkills);
    }
  };

  const handleAddition = () => {
    if (skill.trim() !== "") {
      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
        setSuggestedSkills(dbSkills);
      }
      setSkill("");
    }
  };

  return (
    <Container fluid className="container">
      <Navbar className="navigation-bar">
        <Container className="icon row">
          <BsBootstrapFill
            color="#563d7c"
            size={20}
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          <Link className="padding" to="/home">
            Media Library{" "}
          </Link>
        </Container>
        {/* <NavLink className = "padding" to="/addition">Addition Page</NavLink> */}
        {/* <Link className = "padding" to="/table">Table Content </Link> */}
        <Link className="padding" to="/addInventory">
          Add Skill{" "}
        </Link>
        <Link className="padding" to="/inventory">
          User Details{" "}
        </Link>
        <Link className="padding" to="/profile">Profile</Link>
      </Navbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div className="formContainer">
          <h1 className="users-content">
            {!n ? "Add New Skill" : "Update Inventory Item"}
          </h1>
          <div className="input-section">
            <Col>
              <p className="input-label">Skill:</p>
            </Col>
            <Row className="input-border">
              <input
                value={skill}
                name="name"
                className="input_feild"
                // onChange={(val) => setSkill(val.target.value)}
                onChange={handleSkillChange}
              />
            </Row>
          </div>
          <ul style={{ listStyleType: "none", paddingLeft: 50 }}>
            {suggestedSkills?.map((suggestedSkill, index) => (
              <li
                key={index}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                {suggestedSkill.skill}
              </li>
            ))}
          </ul>
          <Button
            className="addButton"
            onClick={() => addDocumentToCollection()}
          >
            {n ? "Update" : "Add"}
          </Button>
          <br />
          {/* <p>Skills added:</p>
      {skills && <ul>
        {skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>} */}
        </div>
      </div>
    </Container>
  );
}
export default AddInventory;
