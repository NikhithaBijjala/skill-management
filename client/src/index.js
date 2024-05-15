import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MoreInfo from './MoreInfo';
import Addition from './Addition';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from "react-router-dom";
import TableComponent from './assignment2/TableComponent';
import InventoryManagement from './assignment2/InventoryManagement';
import AddInventory from './assignment2/AddInventory';
import { HashRouter } from 'react-router-dom'
import LoginPage from './assignment3/LoginPage';
import SignUpPage from './assignment3/SignUp';
import ProfilePage from './assignment3/ProfilePage';
import store from './store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="526275611408-4hjbrrjd06vlnt09er48apblu09bfrk1.apps.googleusercontent.com" sameSite="None">
  <Provider store={store}>
  <HashRouter>
    <Routes>
      <Route>
        <Route path="home" element={<App />} ></Route>
        <Route path="table" element={<TableComponent />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route path="addInventory" element={<AddInventory />} />
        <Route path="inventory/addInventory" element={<AddInventory />} />
        <Route index path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage/>} />
        <Route path="profile" element={<ProfilePage/>} />
        {/* <Route path="/addInventory" render={(props) => <AddInventory {...props.location.state} />} /> */}
        <Route path="addition" element={<Addition />} >
       
          <Route
            path="addition/moreInfo"
            replace
            element={<MoreInfo />}
          />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
  </Provider>
  </GoogleOAuthProvider>
);
reportWebVitals();


