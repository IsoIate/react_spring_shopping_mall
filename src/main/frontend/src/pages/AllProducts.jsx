import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Image, Button, Card, Col, Row } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Container from "react-bootstrap/Container";
import main_banner from "../assets/main_banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AllProducts() {
    let params = useParams();
    let navigate = useNavigate();
    let [fruitList, setFruitList] = useState([]);
    let categoryInfo = useSelector((state) => state.category);
    let [category, setCategory] = useState('');
    let [totalPage, setTotalPage] = useState(0);
    let [pageSize, setPageSize] = useState(0);
    let pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    useEffect(() => {
        // 과일 분류별 DB 조회
        axios.get("/api/allProductsList")
            .then((res) => {
                setFruitList(res.data.content)
                setTotalPage(res.data.totalPages)
                setPageSize(res.data.size)
            })
            .catch((error) => {
                console.log(error)
            })

        // 과일 분류명 가져오기
        for (const [key, value] of Object.entries(categoryInfo)) {
            if (key === ("newProducts")) {
                setCategory(value);
                break;
            }
            else setCategory(value);
        }

    }, [])

    function movePage(page) {
        axios.get("/api/allProductsList", {
            params: {
                page: page - 1,
                limit: pageSize
            }
        })
            .then((res) => {
                setFruitList(res.data.content)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                            <h2 className="text-center mb-4">{category}</h2>
                            <Row>
                                {fruitList.map((data, index) => {
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
                            <Pagination className="d-flex justify-content-center mt-3">
                                <Pagination.Prev />
                                {
                                    Array.from({ length: totalPage }, (_, i) => (
                                        <Pagination.Item key={i} onClick={() => { movePage(i + 1) }}>{i + 1}</Pagination.Item>
                                    ))
                                }
                                <Pagination.Next />
                            </Pagination>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProducts;