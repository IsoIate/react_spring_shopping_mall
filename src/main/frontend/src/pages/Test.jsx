import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Image, Button } from "react-bootstrap";
import main_banner from "../assets/main_banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../store.js"

function Test() {

    let navigate = useNavigate();
    let [fruitList, setFruitList] = useState([])
    let a = useSelector((state) => { return state.order })
    const dispatch = useDispatch();

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

    function temp() {
        dispatch(updateOrder({ title: "사과", price: 7000, qy: 5, info: "123" }));


    }

    function info() {
        console.log(a)
    }

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
                                        <img src={data.fruitImage} />
                                        <p> {data.fruitName} </p>
                                        <p> {data.price} </p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <Button onClick={() => { temp() }}>1 </Button>
            <Button onClick={() => { info() }}>2</Button>
        </>
    )
}

export default Test