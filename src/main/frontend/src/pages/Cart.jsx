import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/detail.css"
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../store/orderSlice.js"
// import { Button, Card, Col, Form, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
// import Container from "react-bootstrap/Container";

import { Container, Row, Col, Card, Button, Tabs, Tab, Form, ListGroup, FormControl, InputGroup, Image } from 'react-bootstrap';

const dummyProduct = {
    name: '프리미엄 딸기 500g',
    price: 7900,
    image: 'https://source.unsplash.com/600x400/?strawberry',
};

const dummyReviews = [
    { id: 1, author: '홍길동', content: '정말 신선하고 맛있어요!', rating: 5 },
    { id: 2, author: '이영희', content: '배송이 빠르고 품질도 좋아요!', rating: 4 },
];

function Detail() {

    let navigate = useNavigate();
    let params = useParams();   // 고객 ID로 변경필요
    const dispatch = useDispatch();

    let [cartData, setCartData] = useState([]);
    let totalPrice = cartData.reduce((sum, item) => sum + item.price * item.count, 0);

    useEffect(() => {

        axios.get("/api/cartList/" + params.id)
            .then((res) => {
                console.log(res.data)
                setCartData(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params])


    const [inventoryQy, setInventoryQy] = useState(30);

    // 수량 버튼 조작부
    function changeFruitQy(type, index) {
        let data = [...cartData];
        let qy = data[index].count;

        type === "plus" ? qy += 1 : qy -= 1;

        data[index].count = qy;

        setCartData(data);
    }

    function updateCartItem() {
        axios.post("/api/updateCartItem", cartData)
            .then((res) => {
                console.log(res.data)
                navigate("/purchase/2")
            })
            .catch((e) => {

            })
    }

    function deleteCartItem(fruitId) {

        if (!confirm("해당 상품을 장바구니에서 삭제하시겠습니까?")) return false;

        axios.delete("/api/deleteCartItem", {
            data: {
                fruitId: Number(fruitId),
                memberId: Number(params.id)
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    function temp() {
        let tempData = [...cartData];

        tempData[0].count = 100;
        setCartData(tempData)
        console.log(cartData)
    }

    return (
        <>
            <Navbar></Navbar>

            <Container className="my-5">
                <h3 className="mb-4">🛒 장바구니</h3>
                <Button onClick={() => { temp() }}>1</Button>
                <Row>
                    <Col md={8}>
                        {
                            cartData.map((item, index) => {
                                return (
                                    <Card className="mb-3" key={index}>
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs={3}>
                                                    <Image src={item.fruitImage} fluid />
                                                </Col>
                                                <Col xs={2}>{item.fruitName}</Col>
                                                <Col xs={2}>{item.price.toLocaleString()}원</Col>
                                                <Col xs={3}>
                                                    <div className="d-flex align-items-center justify-content-evenly">
                                                        <Button variant="outline-secondary" disabled={item.count === 1} onClick={() => { changeFruitQy("minus", index) }}>-</Button>
                                                        <span className="mx-2">{item.count}</span>
                                                        <Button variant="outline-secondary" disabled={item.count >= inventoryQy} onClick={() => { changeFruitQy("plus", index) }}>+</Button>
                                                    </div>
                                                </Col>
                                                <Col xs={2} className="text-end">
                                                    <Button variant="danger" size="sm" onClick={() => { deleteCartItem(item.fruitId) }}>삭제</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }

                    </Col>

                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <h5>주문 요약</h5>
                                <p>총 수량: {cartData.reduce((sum, item) => sum + item.count, 0)}개</p>
                                <p>총 가격: {totalPrice.toLocaleString()}원</p>
                                <Button variant="success" className="w-100" onClick={() => { updateCartItem() }}>주문하기</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Detail