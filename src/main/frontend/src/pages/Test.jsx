import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';

function PurchasePage() {


    let params = useParams();
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


    return (
        <Container className="mt-5">
            <h3>🧾 구매하기</h3>

            {/* 상품 정보 */}
            {
                cartData.map((item, index) => {
                    return (
                        <Card className="mb-3" >
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col xs={3}>
                                        <Image src={item.fruitImage} fluid />
                                    </Col>
                                    <Col xs={2}>{"a"}</Col>
                                    <Col xs={2}>{1}원</Col>
                                    <Col xs={3}>
                                        <div className="d-flex align-items-center justify-content-evenly">
                                            <Button variant="outline-secondary"  >-</Button>
                                            <span className="mx-2">{1}</span>
                                            <Button variant="outline-secondary"  >+</Button>
                                        </div>
                                    </Col>
                                    <Col xs={2} className="text-end">
                                        <Button variant="danger" size="sm" >삭제</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            {/* <Card className="mb-4">
                <Card.Body>
                    <Row>
                        <Col md={2}>
                            <img src="/example-fruit.jpg" alt="fruit" width="100%" />
                        </Col>
                        <Col md={7}>
                            <h5>사과</h5>
                            <p>신선한 국내산 사과</p>
                        </Col>
                        <Col md={3} className="text-end">
                            <p>수량: 2개</p>
                            <p><strong>총액: 6,000원</strong></p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card> */}

            {/* 배송 정보 */}
            < Card className="mb-4" >
                <Card.Header>🚚 배송 정보</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>받는 사람</Form.Label>
                            <Form.Control type="text" placeholder="이름을 입력하세요" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>연락처</Form.Label>
                            <Form.Control type="text" placeholder="010-xxxx-xxxx" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <Form.Control type="text" placeholder="배송 주소를 입력하세요" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>요청사항</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="배송 시 요청사항이 있다면 입력하세요" />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            {/* 결제 버튼 */}
            <div className="text-end">
                <Button variant="success" size="lg">💳 결제하기</Button>
            </div>
        </Container >
    );
}

export default PurchasePage;
