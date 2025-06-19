import Navbar from "../components/Navbar.jsx";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import main_banner from "../assets/main_banner.png";
import React from "react";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";

function MainPage() {

    let navigate = useNavigate();
    let bestFruits = [0, 1, 2, 3];

    const products = [
        {
            id: 1,
            name: "프리미엄 딸기 500g",
            price: 7900,
            image: "https://source.unsplash.com/300x200/?strawberry"
        },
        {
            id: 2,
            name: "신선한 바나나 1kg",
            price: 5900,
            image: "https://source.unsplash.com/300x200/?banana"
        },
        {
            id: 3,
            name: "청포도 700g",
            price: 9900,
            image: "https://source.unsplash.com/300x200/?grape"
        }
    ];

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
                        <Container className="py-4">
                            <h2 className="text-center mb-4">🍓 오늘의 과일 상품</h2>
                            <Row>
                                {products.map(product => (
                                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                        <Card className="h-100 shadow-sm">
                                            <Card.Img variant="top" src={product.image} />
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text className="text-muted">{product.price.toLocaleString()}원</Card.Text>
                                                <Button variant="success" className="mt-auto">장바구니 담기</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
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