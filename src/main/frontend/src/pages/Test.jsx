import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {Image} from "react-bootstrap";
import main_banner from "../assets/main_banner.png";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Test() {

    let navigate = useNavigate();
    let [fruitList, setFruitList] = useState([])

    useEffect(() => {

        axios.get("/api/fruitList")
            .then((res) => {
                console.log(res.data)
                setFruitList(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (

        <>
            <div className={"mainDiv"}>
                <Navbar></Navbar>
                <div className={"main_banner"}>
                    <Image src={main_banner}></Image>
                </div>
                <div className={"bestDiv mt-5"}>
                    <h3> 베스트 상품 </h3>
                    <div className={"bestTab mt-3"}>
                        <ul>
                            <li> 실시간</li>
                            <li> |</li>
                            <li> 주간</li>
                            <li> |</li>
                            <li> 월간</li>
                        </ul>
                    </div>
                    <div className={"bestInnerDiv mt-3"}>
                        {
                            fruitList.map((data, index) => {
                                return (
                                    <div className={"fruitInfo"} key={index} onClick={() => { navigate("/detail/" + data.fruitId) }}>
                                        <img src={data.fruitImage}/>
                                        <p> {data.fruitName} </p>
                                        <p> {data.price} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test