import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useSelector, useDispatch } from 'react-redux';
import { storeUserDetails } from '../userslice';
import { BsBootstrapFill } from "react-icons/bs";
import { Navbar, Container, Button } from 'react-bootstrap'

function ProfilePage() {
  // const userDetails = useSelector((state) => state.userDetails.user)
  var userDetails = JSON.parse(window.sessionStorage.getItem("token"));
  useEffect(() => { console.log("session", userDetails) }, [userDetails])
  const dispatch = useDispatch()
  const navigation = useNavigate()



  return (
    <div>
      <Navbar className="navigation-bar">
                <Container className='icon row'>
                    <BsBootstrapFill color='#563d7c' size={20} style={{ marginLeft: 10, marginRight: 10 }} />
                    <Link className="padding" to="/home">Media Library </Link>
                </Container>
                <Link className="padding" to="/addition">Addition Page</Link>
                {/* <Link className="padding" to="/table">Table Content </Link> */}
                <Link className="padding" to="/addInventory">Add Skill </Link>
                <Link className="padding" to="/inventory">User Details </Link>
            </Navbar>
    <div className="wrapper">
      {userDetails && <div className="child c1">
        <div className="loginform">
          <div className="started"> USER DETAILS</div>
          <label>
            <div className="input">
              <p>UserName : </p>
              <p>{userDetails.userName}</p>
            </div>
          </label>
          <div className="input input2">
            <p>Password : </p>
            <p>{userDetails.password}</p>
          </div>
          <div className="input input2">
            <p>First Name : </p>
            <p>{userDetails.firstName}</p>
          </div>
          <div className="input input2">
            <p>Last Name : </p>
            <p>{userDetails.lastName}</p>
          </div>

        </div>
      </div>
      }
    </div>
    </div>
  )

}
export default ProfilePage;