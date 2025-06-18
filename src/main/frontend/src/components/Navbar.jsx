import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Navbar.css';
import Form from "react-bootstrap/Form";
import {Button, Col, Image, Row} from "react-bootstrap";
import main_banner from '../assets/main_banner_2.png';

function navbar() {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className={"custom_mw"}>
                    <Navbar.Brand href="/">달콤청과</Navbar.Brand>
                    <Nav className="me-auto user-nav">
                        <Nav.Link href="/fruitInsert">과일 등록</Nav.Link>
                        <Nav.Link href="/test">과일 조회</Nav.Link>
                        <Nav.Link href="#pricing">아이디</Nav.Link>
                        <Nav.Link href="#pricing">장바구니</Nav.Link>
                        <Nav.Link href="#home">로그인</Nav.Link>
                        <Nav.Link href="#features">로그아웃</Nav.Link>
                        <Nav.Link href="#pricing">회원가입</Nav.Link>
                    </Nav>
                </Container>
                <Container className={"custom_mw mt-2 mb-1"}>
                    <h4> 123 마트 </h4>
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
            <Container className={"bannerContainer"}>
                <Image src={main_banner} className={"mt-3 mb-3"}></Image>
            </Container>
            <Container className={"tabContainer"}>
                <Nav defaultActiveKey="/home" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href="/home">베스트</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-1">신상품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-2">제철과일</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-3">사과/배</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-4">귤/한라봉/감귤류</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-5">수박/메론/참외</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-6">딸기/블루베리/베리류</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </>
    )
}

export default navbar