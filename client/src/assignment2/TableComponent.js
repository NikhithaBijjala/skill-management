import { useState, useEffect } from 'react';
import { Navbar,Container } from 'react-bootstrap';
import { BsBootstrapFill } from "react-icons/bs";
import {  Link, NavLink } from "react-router-dom";

function TableComponent() {
    const [data, setData] = useState()
    useEffect(() => {
        console.log("useEffect ");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(result => result.json())
            .then(json => { setData(json); console.log("data is", json); })
    }, [])

    return (<>
        <Navbar className="navigation-bar">
                <Container className='icon row'>
                    <BsBootstrapFill color='#563d7c' size={20} style={{ marginLeft: 10, marginRight: 10 }} />
                    <Link className="padding" to="/home">Media Library </Link>
                </Container>
                {/* <NavLink className="padding" to="/addition">Addition Page</NavLink>
                <Link className="padding" to="/table">Table Content </Link> */}
                <Link className="padding" to="/addInventory">Add Skill </Link>
                <Link className="padding" to="/inventory">User Details</Link>
            </Navbar>
        <div className='table-section'>
            <h1 className='users-content'>USERS</h1><br />
            <table id="table">
                <thead>
                    <tr>
                        <td><b>NAME</b></td>
                        <td><b>EMAIL</b></td>
                        <td><b>PHONE</b></td>
                        <td><b>WEBSITE</b></td>
                        <td><b>COMPANY</b></td>
                    </tr>
                    {data && data.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.website}</td>
                                <td>{item.company.name}</td>
                            </tr>
                        )
                    })}
                </thead>
            </table>
        </div>
    </>)
}
export default TableComponent;