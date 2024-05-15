import './App.css';
import { useState } from 'react';
import { Navbar, Col, Row, Container } from 'react-bootstrap'
import { BsBootstrapFill } from "react-icons/bs";
import picture from './images/picture.jpg'
import { Link, NavLink, Outlet} from 'react-router-dom';



function App() {
  const des = " Hello, I am Nikhitha Bijjala,currently pursuing my master's in computer science.I have work experience of 13 months in which for the first 6 months I was a software engineer trainee, during this period I was trained on&nbsp;HTML, CSS, JS, Angular, React, and React native. For the rest of the months, I worked as a mobile application developer, my responsibilities included enhancing existing client's mobile applications using react native.I'm also skilled at a few programming languages C, Java, and Python. I have enrolled in this course as, I'm inclined to enhance my skills and excited to put my learning into real-time projects, and this course gives me such an opportunity where I can fulfill both of them."
  const [username, setUsername] = useState('Nikhitha Bijjala');
  const [description, setDescription] = useState(des)
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [result, setResult] = useState();
  const [result2, setResult2] = useState();

  const sum = () => {
    const res = Number(input1) + Number(input2)
    setResult(res);
    fetch(`http://ec2-3-85-128-110.compute-1.amazonaws.com/add/${input1}/${input2}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Private-Network': 'true',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json()
      ).then((data) => setResult2(data.Addition)
      ).
      catch((e) => console.log("error", e))
  }

  return (
    <Container fluid className='container'>
      <Navbar className="navigation-bar">
        <Container className='icon row'>
          <BsBootstrapFill color='#563d7c' size={20} style={{ marginLeft: 10, marginRight: 10 }} />
          <p>Media Library</p>
        </Container>
        {/* <NavLink className = "padding" to="/addition">Addition Page</NavLink> */}
        {/* <Link className = "padding" to="/table">Table Content </Link> */}
        <Link className = "padding" to="/addInventory">Add Skill </Link>
        <Link className = "padding" to="/inventory">User Details</Link>
        {/* <Link className="padding" to="/">Sign In </Link>
        <Link className="padding" to="/signup">Sign Up </Link> */}
        <Link className="padding" to="/profile">Profile</Link>
      </Navbar>
      <Container fluid className='profile-section row'>
        <Col>
          <img src={picture} alt="Profile picture" style={{ height: 300, width: 300 }} />
        </Col>
        <Container className='description '>
          <textarea className='username-input' value={username} onChange={(val) => setUsername(val.target.value)} />
          <textarea className="description-input" value={description} onChange={(val) => setDescription(val.target.value)} />
        </Container>
      </Container>
      {/* <Container className='input-section'>
        <Col>
          <p className='input-label'>Enter the first number:</p>
        </Col>
        <Row className='input-border'>
          <Row>
            <input type={'number'}  value = {input1} className="input_feild" onChange={(val) => setInput1(val.target.value)} />
          </Row>
        </Row>
      </Container>
      <Container className='input-section'>
        <Col>
          <p className='input-label'>Enter the second number:</p>
        </Col>
        <Row className='input-border'>
          <input type={'number'}  value = {input2} name="input2" className="input_feild" onChange={(val) => setInput2(val.target.value)} />
        </Row>
      </Container>
      <button onClick={() => sum()} className="submit-button">Submit</button>
      <h2>Your addition result( from server ): {result2} </h2>
      <h2>Your addition result( from ReactJs ):  {result} </h2> */}
      <Outlet/>
    </Container>
   
  );
}

export default App;

// import { useState } from 'react';
// import { BsBootstrapFill } from "react-icons/bs";
// import { Link, NavLink, Outlet} from 'react-router-dom';
// import { Navbar, Col, Row, Container, Button } from 'react-bootstrap'

// function Addition() {
//     const [input1, setInput1] = useState(0);
//     const [input2, setInput2] = useState(0);
//     const [result, setResult] = useState();
//     const [result2, setResult2] = useState();

//     const sum = () => {
//         const res = Number(input1) + Number(input2)
//         setResult(res);
//         fetch(`http://ec2-3-85-128-110.compute-1.amazonaws.com/add/${input1}/${input2}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//             .then(res => res.json()
//             ).then((data) => setResult2(data.Addition)
//             ).
//             catch((e) => console.log("error", e))
//     }
//     return (<>
//         <div>
//             <Navbar className="navigation-bar">
//                 <Container className='icon row'>
//                     <BsBootstrapFill color='#563d7c' size={20} style={{ marginLeft: 10, marginRight: 10 }} />
//                     <Link className="padding" to="/home">Media Library </Link>
//                 </Container>
//                 <NavLink className="padding" to="/addition">Addition Page</NavLink>
//                 <Link className="padding" to="/table">Table Content </Link>
//                 <Link className="padding" to="/addInventory">Add Inventory </Link>
//                 <Link className="padding" to="/inventory">Inventory Management </Link>
//             </Navbar>
//             <div className='input-section'>
//                 <p className='input-label'>Enter the first number:</p>
//                 <div className='input-border'>
//                     <input type={'number'} name="input1" className="input_feild" onChange={(val) => setInput1(val.target.value)} />
//                 </div>
//             </div>
//             <div className='input-section'>
//                 <p className='input-label'>Enter the second number:</p>
//                 <div className='input-border'>
//                     <input type={'number'} name="input2" className="input_feild" onChange={(val) => setInput2(val.target.value)} />
//                 </div>
//             </div>
//             <button onClick={() => sum()} className="submit-button">Submit</button>
//             <h2>Your addition result( from server ): {result2} </h2>
//             <h2>Your addition result( from ReactJs ):  {result} </h2>
//             <NavLink
//                 to="addition/moreInfo"
//                 className={isActive =>
//                     "nav-link" + (!isActive ? " unselected" : "")
//                 }
//                 style={isActive => ({
//                     color: isActive ? "red" : "blue"
//                 })}
//             >
//                 NavLink for More Info
//             </NavLink>
//             <Outlet />
//         </div></>)
// }
// export default Addition;

