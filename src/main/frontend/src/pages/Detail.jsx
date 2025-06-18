import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "../css/detail.css"
import {Button, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Detail() {

    let navigate = useNavigate();
    let [fruitImage, setFruitImage] = useState(null);
    let [fruitName, setFruitName] = useState('');
    let [price, setPrice] = useState('');
    let [quantity, setQuantity] = useState('');
    let [fruitQy, setFruitQy] = useState(1);
    let [minusBtnStatus, setMinusBtnStatus] = useState(true);
    let [plusBtnStatus, setPlusBtnStatus] = useState(false);
    let params = useParams();

    useEffect(() => {

        axios.get("/api/detail/" + params.id)
            .then((res) => {
                console.log(res.data)
                setFruitName(res.data.fruitName);
                setPrice(res.data.price);
                setQuantity(res.data.quantity)
                setFruitImage(res.data.fruitImage);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params])

    useEffect(() => {
        if(fruitQy === 1) {
            setMinusBtnStatus(true)
        }
        else if (fruitQy >= 100) {
            setPlusBtnStatus(true)
        }
        else {
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
        if(/^[0-9]+$/.test(qy.target.value)) {
            if(onlyNums < 1)
                onlyNums = 1;
            else if(onlyNums > 100)
                onlyNums = 100;

            setFruitQy(onlyNums)
        }
        else {
            setFruitQy(fruitQy)
        }
    }

    return (

        <>
            <div className={"mainDiv"}>
                <Navbar></Navbar>

                <div className={"fruitInfoTop mt-5"}>
                    <div className={"fruitInfoDiv mt-3"}>
                        <div className={"fruitImageDiv"}>
                            <img src={fruitImage}/>

                        </div>
                        <Container className={"fruitInfo"}>
                            <Row>
                                <Col className={"col-12"}> {fruitName} </Col>
                            </Row>
                            <Row>
                                <Col className={"col-4"}> 판매가 : </Col>
                                <Col className={"col-8"}> {price} 원 </Col>
                            </Row>
                            <Row>
                                <Col className={"col-4"}> 잔여수량 : </Col>
                                <Col className={"col-8"}> {quantity} </Col>
                            </Row>
                            <Row>
                                <Col className={"col-4"}> 배송방법 : </Col>
                                <Col className={"col-8"}>
                                    <select>
                                        <option> 방문수령</option>
                                        <option> 택배수령</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={"col-4"}> 주문수량 : </Col>
                                <Col className={"col-8"}>
                                    <Button disabled={minusBtnStatus} onClick={() => {
                                        changeFruitQy("minus")
                                    }}> - </Button>
                                    <input type="text" name="fruitOrderQy" value={fruitQy} onChange={(qy) => { inputNumber(qy) }}/>
                                    <Button disabled={plusBtnStatus} onClick={() => {
                                        changeFruitQy("plus")
                                    }}> + </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={"col-4"}> 총 상품 금액 : </Col>
                                <Col className={"col-8"}> {price * fruitQy} </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail