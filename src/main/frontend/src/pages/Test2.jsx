import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector } from "react-redux";
import "../css/purchase.css"
import styled from 'styled-components';


// TODO : form 전송, 고객 정보 DB조회 후 기입

function Purchase() {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("주문 정보:", form);
        console.log("총 결제 금액:", totalPrice);
        alert("결제가 완료되었습니다!");
    };



    let orderData = useSelector((state) => { return state.order })
    let [orderQy, setOrderQy] = useState(1);
    const [inventoryQy, setInventoryQy] = useState(1);

    // 수량 초기화
    useEffect(() => {
        setOrderQy(orderData.orderQy);
        setInventoryQy(orderData.inventoryQy)
    }, [])

    // 수량 버튼 조작부
    function changeFruitQy(type) {
        let qy = orderQy;
        type === "plus" ? qy += 1 : qy -= 1;

        setOrderQy(qy);
    }

    function inputNumber(qy) {
        let onlyNums = qy.target.value;

        // 숫자만 받는 정규식
        if (/^[0-9]+$/.test(qy.target.value)) {
            if (onlyNums < 1)
                onlyNums = 1;
            else if (onlyNums > inventoryQy)
                onlyNums = inventoryQy;

            setOrderQy(onlyNums)
        } else {
            setOrderQy(orderQy)
        }
    }

    return (
        <Container className="py-5">
            <h3 className="text-center mb-4">🍓 과일 결제 페이지</h3>

            <Container className="py-4 px-0">
                <Row className=''>
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src={orderData.imgUrl} />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card.Body className="d-flex flex-column h-100">
                            <h2 className="mb-4">{orderData.title}</h2>
                            <h4>{orderData.price.toLocaleString()}원</h4>
                            <p> {orderData.unit}</p>
                            <InputGroup style={{ maxWidth: '180px' }}>
                                <Button variant="outline-secondary" disabled={orderQy === 1} onClick={() => { changeFruitQy("minus") }}>
                                    –
                                </Button>
                                <FormControl className="text-center no-spinner" type="number" name="fruitOrderQy" value={orderQy} onChange={(qy) => { inputNumber(qy) }} />
                                <Button variant="outline-secondary" disabled={orderQy >= inventoryQy} onClick={() => { changeFruitQy("plus") }}>
                                    +
                                </Button>
                            </InputGroup>
                            <div className="mt-auto d-flex justify-content-between">
                                <h5 className="text-danger">총액: {(orderData.price * orderQy).toLocaleString()}원</h5>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
            <Row>
                {/* 배송/결제 정보 */}
                <Col md={12} className="mb-4">
                    <Card className="p-4 shadow-sm">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="받는 분 성함" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>주소</Form.Label>
                                <Form.Control type="text" name="address" required placeholder="배송 받을 주소" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>연락처</Form.Label>
                                <Form.Control type="tel" name="phone" required placeholder="010-1234-5678" onChange={handleChange} />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100 mt-3">
                                {(orderData.price * orderQy).toLocaleString()}원 결제하기
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col md={12}>
                    <Card className="p-4 shadow-sm">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="받는 분 성함" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>주소</Form.Label>
                                <Form.Control type="text" name="address" required placeholder="배송 받을 주소" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>연락처</Form.Label>
                                <Form.Control type="tel" name="phone" required placeholder="010-1234-5678" onChange={handleChange} />
                            </Form.Group>

                            <Button type="submit" variant="primary" className="w-100 mt-3">
                                {totalPrice.toLocaleString()}원 결제하기
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row> */}
        </Container >
    );
}

export default Purchase;
