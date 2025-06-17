import Navbar from "../components/Navbar.jsx";
import {Image} from "react-bootstrap";
import main_banner from "../assets/main_banner.png";
import React from "react";
import {useNavigate} from "react-router-dom";

function MainPage() {

    let navigate = useNavigate();
    let bestFruits = [0, 1, 2, 3];

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
                            bestFruits.map((value, index) => {

                                return (
                                    <div className={"fruitInfo"} onClick={() => { navigate("/detail/" + value)}}>
                                        <img src={'https://placehold.co/500'}/>
                                        <p> 과일 {index + 1} </p>
                                        <p> 10000원 </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={"bestDiv mt-5"}>
                    <h3> 신상품 </h3>
                    <div className={"bestInnerDiv mt-3"}>
                        {
                            bestFruits.map((value, index) => {

                                return (
                                    <div className={"fruitInfo"} onClick={() => { navigate("/detail/" + value)}}>
                                        <img src={'https://placehold.co/500'}/>
                                        <p> 과일 1 </p>
                                        <p> 10000원 </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={"bestDiv mt-5"}>
                    <h3> 베스트 리뷰 </h3>
                    <div className={"bestInnerDiv mt-3"}>
                        {
                            bestFruits.map((value, index) => {

                                return (
                                    <div className={"fruitInfo"} onClick={() => { navigate("/detail/" + value)}}>
                                        <img src={'https://placehold.co/500'}/>
                                        <p> 과일 1 </p>
                                        <p> 10000원 </p>
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

export default MainPage