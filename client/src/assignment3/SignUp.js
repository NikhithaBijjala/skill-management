import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate, createSearchParams, } from "react-router-dom";

function SignUpPage() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const navigation = useNavigate()


    const onSignUp = () => {
        console.log("values", userName, password, LastName, firstName)
        if (password !== repassword) {
            toast.error("Re-enter the password correctly")
        }
        else {
            fetch(`http://localhost:5000/addInventory/getUsers`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Private-Network': 'true',
                    'Content-Type': 'application/json'
                },

            }).then((res) => res.json()).then((res) => {
                console.log("res on getUsers", res.data);
                var count = 0;
                res.data.map((item) => {
                    if (item.userName == userName) {
                        count = 1;
                        console.log("userName matched");
                    }
                })
                if (count > 0) {
                    toast.error("Username already exists");
                }
                else {
                    fetch(`http://localhost:5000/addInventory/addUser`, {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Private-Network': 'true',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userName,
                            password,
                            lastName: LastName,
                            firstName
                        })
                    }).then((res) => res.json()).then((res) => {
                        console.log("res on addUser", res.data);
                        toast.success("Accout created successfully", {
                            onClose: () => {
                                navigation("/");
                            },
                        })
                    }).catch((e) => console.log("error", e))

                }
            }).catch((e) => console.log("error", e))

        }
    }

    return (
        <div className="wrapper">
            <div className="child c1">
                <div className="loginform">
                    <div className="started">WELCOME</div>
                    <label>
                        <div className="input">
                            {/* <i className="fa fa-user-friends icon"></i> */}
                            <input className="input_feild " value={userName} onChange={(val) => setUserName(val.target.value)} type="text" placeholder="Username" />
                        </div>
                    </label>
                    <label>
                        <div className="input input2">
                            {/* <i className="fa fa-unlock-alt icon"></i> */}
                            <input className="input_feild" onChange={(val) => setPassword(val.target.value)}
                                value={password} type="password" placeholder="Password" />
                        </div>
                    </label>
                    <label>
                        <div className="input input2">
                            {/* <i className="fa fa-unlock-alt icon"></i> */}
                            <input className="input_feild" value={repassword} onChange={(val) => setRePassword(val.target.value)} type="password" placeholder="Re-Enter Password" />
                            {/* { error &&  <p style={{color:"red"}}>Re-Enter correct password</p>} */}
                        </div>
                    </label>
                    <label>
                        <div className="input input2">
                            {/* <i className="fa fa-unlock-alt icon"></i> */}
                            <input className="input_feild" value={LastName} onChange={(val) => setLastName(val.target.value)} placeholder="Last name" />
                        </div>
                    </label>
                    <label>
                        <div className="input input2">
                            {/* <i className="fa fa-unlock-alt icon"></i> */}
                            <input className="input_feild" value={firstName} onChange={(val) => setFirstName(val.target.value)} placeholder="First Name" />
                        </div>
                    </label>

                    <div className="bottom">
                        <Link to="/">Already have an account ? Sign In</Link>
                        <button className="signin_btn" onClick={onSignUp}> SIGN UP </button>
                    </div>

                </div>
            </div>

            <ToastContainer />
        </div>



    )

}
export default SignUpPage;