import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storeUserDetails } from "../userslice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onPressSubmit = () => {
    console.log("username, password", userName, password);
    // fetch(`http://ec2-3-85-128-110.compute-1.amazonaws.com/addInventory/getUsers`, {
    fetch(`http://localhost:5000/addInventory/getUsers`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Private-Network": "true",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res on getUsers", res.data);
        var count = 0;
        res.data.map((item) => {
          if (item.userName == userName) {
            count = 1;
            console.log("userName matched");
            if (item.password == password) {
              console.log("password matched");
              const data = {
                userName: item.userName,
                password: item.password,
                lastName: item.lastName,
                firstName: item.firstName,
              };
              console.log("data", data);
              window.sessionStorage.setItem("token", JSON.stringify(data));
              dispatch(storeUserDetails(data));
              // navigation("/inventory");
              toast.success("Logged in Successfully", {
                onClose: () => {
                  navigation("/home");
                },
              });
            } else {
              toast.error("Wrong password");
            }
          }
        });
        if (count == 0) {
          toast.error("You don't have an account");
        }
      })
      .catch((e) => console.log("error", e));
  };

  const onGoogleSignIn = (x) => {
    console.log("values", userName, password);
    fetch(`http://localhost:5000/addInventory/getUsers`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Private-Network": "true",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res on getUsers", res.data);
        var count = 0;
        const data = {
          userName: x.email,
          lastName: x.family_name,
          firstName: x.given_name,
          password: "Gmail account",
        };
        res.data.map((item) => {
          if (item.userName == x.email) {
            console.log("userName matched");
            count=1
            window.sessionStorage.setItem("token", JSON.stringify(data));
            dispatch(storeUserDetails(data));
            toast.success("Logged in Sucessfully", {
              onClose: () => {
                navigation("/home");
              },
            });
          }
        });
        if (count == 0) {
          fetch(`http://localhost:5000/addInventory/addUser`, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Private-Network": "true",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: x.email,
              lastName: x.family_name,
              firstName: x.given_name,
              password: "Gmail account",
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log("res on addUser", res.data);
              window.sessionStorage.setItem("token", JSON.stringify(data));
              dispatch(storeUserDetails(data));
              toast.success("Logged in Sucessfully", {
                onClose: () => {
                  navigation("/home");
                },
              });
            })
            .catch((e) => console.log("error", e));
        }
      })
      .catch((e) => console.log("error", e));
  };
  return (
    <div className="wrapper">
      <div className="child c1">
        <div className="loginform">
          <div className="started">Get Started</div>
          <label>
            <div className="input">
              {/* <i className="fa fa-user-friends icon"></i> */}
              <input
                className="input_feild"
                value={userName}
                onChange={(val) => setUserName(val.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>
          </label>
          <label>
            <div className="input input2">
              {/* <i className="fa fa-unlock-alt icon"></i> */}
              <input
                className="input_feild"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
          </label>
          <div className="bottom">
            <Link to="/signup">Don't have an account ? Sign Up</Link>
            <button className="signin_btn" onClick={onPressSubmit}>
              {" "}
              SIGN IN{" "}
            </button>
          </div>
        </div>
        <GoogleLogin
          className="signin_btn"
          onSuccess={(credentialResponse) => {
            var x = jwtDecode(credentialResponse.credential);
            onGoogleSignIn(x)
            setUserName(x.email);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
export default LoginPage;
