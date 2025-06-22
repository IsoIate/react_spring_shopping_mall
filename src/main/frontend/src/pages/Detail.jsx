import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/detail.css"
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../store.js"
// import {Button, Card, Col, Form, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
// import Container from "react-bootstrap/Container";

import { Container, Row, Col, Card, Button, Tabs, Tab, Form, ListGroup, FormControl, InputGroup } from 'react-bootstrap';

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
    let params = useParams();
    const dispatch = useDispatch();

    let [fruitImage, setFruitImage] = useState(null);
    let [fruitName, setFruitName] = useState('');
    let [price, setPrice] = useState('');
    let [quantity, setQuantity] = useState('');
    let [unit, setUnit] = useState('');
    let [detailInfo, setDetailInfo] = useState('');



    let [fruitQy, setFruitQy] = useState(1);
    let [minusBtnStatus, setMinusBtnStatus] = useState(true);
    let [plusBtnStatus, setPlusBtnStatus] = useState(false);





    useEffect(() => {

        axios.get("/api/detail/" + params.id)
            .then((res) => {
                console.log(res.data)
                setFruitName(res.data.fruitName);
                setPrice(res.data.price);
                setQuantity(res.data.quantity)
                setUnit(res.data.unit)
                setDetailInfo(res.data.detailInfo)
                setFruitImage(res.data.fruitImage);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params])

    useEffect(() => {
        if (fruitQy === 1) {
            setMinusBtnStatus(true)
        } else if (fruitQy >= quantity) {
            setPlusBtnStatus(true)
        } else {
            setMinusBtnStatus(false)
            setPlusBtnStatus(false)
        }
    }, [fruitQy])

    // 수량 버튼 조작부
    function changeFruitQy(e) {
        let qy = fruitQy;
        e === "plus" ? qy += 1 : qy -= 1;

        setFruitQy(qy);
    }

    function inputNumber(qy) {
        let onlyNums = qy.target.value;

        // 숫자만 받는 정규식
        if (/^[0-9]+$/.test(qy.target.value)) {
            if (onlyNums < 1)
                onlyNums = 1;
            else if (onlyNums > quantity)
                onlyNums = quantity;

            setFruitQy(onlyNums)
        } else {
            setFruitQy(fruitQy)
        }
    }

    function purchasePage() {
        dispatch(updateOrder({
            title: fruitName,
            price: price,
            orderQy: fruitQy,
            inventoryQy: quantity,
            unit: unit,
            imgUrl: fruitImage
        }))

        navigate("/purchase/2");
    }

    function insertCart() {
        axios.post("/api/insertCart", {
            fruitId: Number(params.id),
            memberId: Number(1),
            fruitQuantity: Number(fruitQy)
        })
            .then((res) => {
                alert("장바구니에 상품이 담겼습니다.");
            })
            .catch((e) => {

            })
    }

    const [reviews, setReviews] = useState(dummyReviews);
    const [newReview, setNewReview] = useState('');

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!newReview.trim()) return;

        const newItem = {
            id: Date.now(),
            author: '익명',
            content: newReview.trim(),
            rating: 5,
        };
        setReviews([...reviews, newItem]);
        setNewReview('');
    };


    return (
        <>
            <Navbar></Navbar>

            <Container className="py-4">
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src={fruitImage} />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card.Body className="d-flex flex-column h-100">
                            <h2 className="mb-4">{fruitName}</h2>
                            <h4>{price.toLocaleString()}원</h4>
                            <p> {unit}</p>
                            <InputGroup style={{ maxWidth: '180px' }}>
                                <Button variant="outline-secondary" disabled={minusBtnStatus} onClick={() => { changeFruitQy("minus") }}>
                                    –
                                </Button>
                                <FormControl className="text-center" name="fruitOrderQy" value={fruitQy} onChange={(qy) => { inputNumber(qy) }} />
                                <Button variant="outline-secondary" disabled={plusBtnStatus} onClick={() => { changeFruitQy("plus") }}>
                                    +
                                </Button>
                            </InputGroup>
                            <div className="mt-auto d-flex justify-content-between">
                                <Button variant="primary" className="me-2 flex-grow-1" onClick={() => { purchasePage() }}>구매하기</Button>
                                <Button variant="success" className="flex-grow-1" onClick={() => { insertCart() }}>장바구니 담기</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="info" className="mt-4">
                    <Tab eventKey="info" title="상품정보">
                        <Card className="mt-3 p-3">
                            <p> {detailInfo} </p>
                        </Card>
                    </Tab>

                    <Tab eventKey="review" title={`리뷰 (${reviews.length})`}>
                        <Card className="mt-3 p-3">
                            <h5 className="mb-3">리뷰 목록</h5>
                            <ListGroup variant="flush">
                                {reviews.map((r) => (
                                    <ListGroup.Item key={r.id}>
                                        <strong>{r.author}</strong>: {r.content}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <Form onSubmit={handleReviewSubmit} className="mt-4">
                                <Form.Group controlId="reviewInput">
                                    <Form.Label>리뷰 작성</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        placeholder="리뷰를 입력하세요"
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="mt-2">
                                    리뷰 등록
                                </Button>
                            </Form>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}

export default Detail