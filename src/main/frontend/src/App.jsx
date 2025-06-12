import React, {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import {Button, Image} from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
import Navbar from "./Navbar.jsx";
import main_banner from "../public/main_banner.png"

function App() {
    // const [data, setData] = useState('');
    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/test')
    //         .then(res => setData(res.data))
    //         .catch(err => console.log(err))
    // }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className={"main_banner"}>
                <Image src={main_banner} ></Image>
            </div>
        </>
    );
}

export default App
