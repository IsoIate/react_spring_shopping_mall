import Navbar from "../components/Navbar.jsx";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import main_banner from "../assets/main_banner.png";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "../css/best.css"


function MainPage() {

    let navigate = useNavigate();
    let [bestFruitList, setBestFruitList] = useState([])
    let [newFruitsList, setNewFruitList] = useState([]);

    useEffect(() => {
        axios.get("/api/bestFruitList/main")
            .then((res) => {
                setBestFruitList(res.data)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.get("/api/newFruitList")
            .then((res) => {
                setNewFruitList(res.data)
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
                    <div className={"bestInnerDiv mt-3"}>
                        <Container className="py-4">
                            <h2 className="text-center mb-4">베스트 상품</h2>
                            <Row>
                                {bestFruitList.map((data, index) => {
                                    return (
                                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                                            <Card className="h-100 shadow-sm imgWrapper">
                                                <Card.Img variant="top" src={data.fruitImage} />
                                                <Card.Title className="best_medal">{
                                                    index === 0 ? "🥇"
                                                        : index === 1 ? "🥈"
                                                            : index === 2 ? "🥉"
                                                                : ""
                                                }</Card.Title>
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title>{data.fruitName}</Card.Title>
                                                    <Card.Text className="text-muted">{data.unit}</Card.Text>
                                                    <Card.Text className="text-muted">{data.price.toLocaleString()}원</Card.Text>
                                                    <Button variant="success" className="mt-auto" onClick={() => { navigate("/detail/" + data.fruitId) }}>자세히 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                    </div>
                    <div className={"bestInnerDiv mt-3"}>
                        <Container className="py-4">
                            <h2 className="text-center mb-4">🍓 이번주 신상품</h2>
                            <Row>
                                {newFruitsList.map((data, index) => {
                                    return (
                                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                                            <Card className="h-100 shadow-sm">
                                                <Card.Img variant="top" src={data.fruitImage} />
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title>{data.fruitName}</Card.Title>
                                                    <Card.Text className="text-muted">{data.unit}</Card.Text>
                                                    <Card.Text className="text-muted">{data.price.toLocaleString()}원</Card.Text>
                                                    <Button variant="success" className="mt-auto" onClick={() => { navigate("/detail/" + data.fruitId) }}>자세히 보기</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                        {/*{*/}
                        {/*    bestFruits.map((value, index) => {*/}

                        {/*        return (*/}
                        {/*            <div className={"fruitInfo"} onClick={() => { navigate("/detail/" + value)}}>*/}
                        {/*                <img src={'https://placehold.co/500'}/>*/}
                        {/*                <p> 과일 {index + 1} </p>*/}
                        {/*                <p> 10000원 </p>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </div>
                </div>
                <div className={"bestDiv mt-5"}>
                    <h3> 베스트 리뷰 </h3>
                    <div className={"bestInnerDiv mt-3"}>
                        {
                            newFruitsList.map((value, index) => {

                                return (
                                    <div className={"fruitInfo"} onClick={() => { navigate("/detail/" + value) }} key={index}>
                                        <img src={'https://placehold.co/500'} />
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