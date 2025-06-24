import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/detail.css"
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from '../store/orderSlice.js';
import { Container, Row, Col, Card, Button, Tabs, Tab, Form, ListGroup, FormControl, InputGroup, FormLabel } from 'react-bootstrap';

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
    let [reviewList, setReviewList] = useState([]);

    let loginData = useSelector((state) => { return state.auth })
    let orderData = useSelector((state) => { return state.order })

    useEffect(() => {

        // 과일 상세정보
        axios.get("/api/detail/" + params.id)
            .then((res) => {
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

        // 리뷰 조회
        axios.get("/api/selectReview/" + params.id)
            .then((res) => {
                setReviewList(res.data)
            })
            .catch((e) => console.log(e))
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

        navigate("/purchase/item");
    }

    function insertCart() {
        axios.post("/api/insertCart", {
            fruitId: Number(params.id),
            memberId: Number(loginData.id),
            fruitQuantity: Number(fruitQy)
        })
            .then((res) => {
                alert("장바구니에 상품이 담겼습니다.");
            })
            .catch((e) => {

            })
    }

    const [review, setReview] = useState('');

    const insertReview = (e) => {
        e.preventDefault();

        if (!review.trim()) return;

        axios.post("/api/insertReview", {
            fruitId: Number(params.id),
            memberId: Number(loginData.id),
            review: review.trim(),
        })
            .then((res) => {
                alert("리뷰를 작성했습니다.");
                window.location.reload();
            })
            .catch((e) => {

            })
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
                            {
                                loginData.isLogIn == true
                                    ?
                                    <div className="mt-auto d-flex justify-content-between">
                                        <Button variant="primary" className="me-2 flex-grow-1" onClick={() => { purchasePage() }}>구매하기</Button>
                                        <Button variant="success" className="flex-grow-1" onClick={() => { insertCart() }}>장바구니 담기</Button>
                                    </div>
                                    :
                                    <InputGroup className="mt-auto d-flex justify-content-between">
                                        <Form.Label className="flex-grow-1"> 죄송합니다. 현재 비회원 구매는 어렵습니다. </Form.Label>
                                        <Button variant="success" className="flex-grow-1" onClick={() => { navigate("/login") }}> 로그인 / 회원가입 </Button>
                                    </InputGroup>
                            }
                        </Card.Body>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="info" className="mt-4">
                    <Tab eventKey="info" title="상품정보">
                        <Card className="mt-3 p-3">
                            <p> {detailInfo} </p>
                        </Card>
                    </Tab>

                    <Tab eventKey="review" title={`리뷰 ${reviewList.length}`}>
                        <Card className="mt-3 p-3">
                            <h5 className="mb-3">리뷰 목록</h5>
                            <ListGroup variant="flush">
                                {reviewList.map((data, index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{data.author}</strong>: {data.review}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <Form onSubmit={insertReview} className="mt-4">
                                <Form.Group controlId="reviewInput">
                                    <Form.Label>리뷰 작성</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="리뷰를 입력하세요"
                                    />
                                </Form.Group>
                                <InputGroup className="justify-content-end">
                                    <Button type="submit" variant="primary" className="mt-2">
                                        리뷰 등록
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}

export default Detail