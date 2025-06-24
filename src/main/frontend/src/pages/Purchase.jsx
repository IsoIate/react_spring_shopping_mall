import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import Navbar from "../components/Navbar.jsx";

function Purchase() {


    let params = useParams();
    let orderData = useSelector((state) => { return state.order })
    let loginData = useSelector((state) => { return state.auth })
    let [cartData, setCartData] = useState([]);
    let [userData, setUserData] = useState({
        id: "",
        memberAdress: "",
        memberDetailAdress: "",
        memberId: "",
        memberName: "",
        memberPhoneNumber: "",
        request: ""
    });
    let orderTotalPrice = orderData.orderQy * orderData.price;
    let cartTotalCount = cartData.reduce((sum, item) => sum + item.count, 0);
    let cartTotalPrice = cartData.reduce((sum, item) => sum + item.price * item.count, 0);

    useEffect(() => {
        axios.get("/api/cartList/" + loginData.id)
            .then((res) => {
                setCartData(res.data);
            })
            .catch((error) => {
                console.log(error)
            })

        axios.get("/api/memberInfo/" + loginData.id)
            .then((res) => {
                console.log(res.data)
                setUserData(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    let formChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    let formSubmit = () => {
        let paymentData = [];

        if (params.id == "item") {
            paymentData = orderData;
        }
        else if (params.id == "cart") {
            paymentData = cartData;
        }

        alert("결제 기능은 아직 구현중입니다.");

        // axios.post("/api/insertPayment", {
        //     userData: userData,
        //     paymentData: cartData
        // })
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((e) => console.log(e))

        // console.log(userData)
        // console.log(orderData)
        // console.log(cartData)
        // console.log(paymentData)
    }

    return (
        <>
            <Navbar></Navbar>

            <Container className="mt-5">
                <h3>🧾 구매하기</h3>
                {
                    params.id == "item"
                        ? <OrderInfoTemplate_1 orderData={orderData}></OrderInfoTemplate_1>
                        : <OrderInfoTemplate_2 cartData={cartData}></OrderInfoTemplate_2>

                }

                < Card className="mb-4" >
                    <Card.Header>🚚 배송 정보</Card.Header>
                    <Card.Body>
                        <Form >
                            <Form.Group className="mb-3">
                                <Form.Label>받는 사람</Form.Label>
                                <Form.Control type="text" name="memberName" value={userData.memberName} onChange={formChange} placeholder="이름을 입력하세요" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>연락처</Form.Label>
                                <Form.Control type="text" name="memberPhoneNumber" value={userData.memberPhoneNumber} onChange={formChange} placeholder="010-xxxx-xxxx" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>주소</Form.Label>
                                <Form.Control type="text" name="memberAdress" value={userData.memberAdress} onChange={formChange} className="mb-1" placeholder="배송 주소를 입력하세요" />
                                <Form.Control type="text" name="memberDetailAdress" value={userData.memberDetailAdress} onChange={formChange} placeholder="배송 주소를 입력하세요" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>요청사항</Form.Label>
                                <Form.Control as="textarea" rows={2} name="request" value={userData.request} onChange={formChange} placeholder="배송 시 요청사항이 있다면 입력하세요" />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Row>
                            <Col md={7} className="text-start">
                                {
                                    params.id == "item"
                                        ? <p>총 수량: {orderData.orderQy}개</p>
                                        : <p>총 수량: {cartTotalCount}개</p>
                                }
                                {
                                    params.id == "item"
                                        ? <p><strong>총액: {orderTotalPrice.toLocaleString()}원</strong></p>
                                        : <p><strong>총액: {cartTotalPrice.toLocaleString()}원</strong></p>
                                }

                            </Col>
                            <Col md={5} className="d-flex justify-content-end align-items-center">
                                <div className="text-end">
                                    <Button variant="success" size="lg" onClick={() => { formSubmit() }}>💳 결제하기</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container >
        </>
    );
}

function OrderInfoTemplate_1({ orderData }) {
    return (
        <Card className="mb-3" >
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={3}>
                        <Image src={orderData.imgUrl} fluid />
                    </Col>
                    <Col xs={3}>{orderData.title}</Col>
                    <Col xs={2}>{orderData.price.toLocaleString()}원</Col>
                    <Col xs={2}>수량 : {orderData.orderQy}</Col>
                    <Col xs={2}><strong>계 : {(orderData.price * orderData.orderQy).toLocaleString()}원</strong></Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

function OrderInfoTemplate_2({ cartData }) {

    return (
        cartData.map((item, index) => {
            return (
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs={3}>
                                <Image src={item.fruitImage} fluid />
                            </Col>
                            <Col xs={3}>{item.fruitName}</Col>
                            <Col xs={2}>{item.price.toLocaleString()}원</Col>
                            <Col xs={2}>수량 : {item.count}</Col>
                            <Col xs={2}><strong>계 : {(item.price * item.count).toLocaleString()}</strong>원</Col>
                        </Row>
                    </Card.Body>
                </Card>
            )
        })
    )
}

export default Purchase;
