import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Navbar.css';
import Form from "react-bootstrap/Form";
import { Button, Col, Image, Row } from "react-bootstrap";
import main_banner from '../assets/main_banner_2.png';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { persistor } from '../store/store';
import axios from 'axios';

function navbar() {
    let navigate = useNavigate();
    // let loginData = useSelector((state) => { return state.login })
    let loginData = useSelector((state) => { return state.auth })
    let dispatch = useDispatch();

    function logoutBtn() {


        axios.post("/api/logout", {}, {
            withCredentials: true
        })
            .then((res) => {
                alert("로그아웃 되었습니다.");
                dispatch(logout());
                window.location.reload();
            })
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className={"custom_mw"}>
                    <Navbar.Brand href="/">달콤청과</Navbar.Brand>
                    <Nav className="me-auto user-nav">
                        <Nav.Link href="/cart/1">장바구니</Nav.Link>
                        <Nav.Link href="/fruitInsert">과일 등록</Nav.Link>
                        <Nav.Link href="/test">과일 조회</Nav.Link>
                        {
                            loginData.isLogIn == false
                                ? <Nav.Link href="/login">로그인</Nav.Link>
                                : <Nav.Link onClick={() => { persistor.purge(); }}> {loginData.user} 님 어서오세요 </Nav.Link>
                        }
                        {
                            loginData.isLogIn == false
                                ? <Nav.Link href="/register">회원가입</Nav.Link>
                                : <Nav.Link onClick={() => { logoutBtn() }}>로그아웃</Nav.Link>
                        }

                    </Nav>
                </Container>
            </Navbar>
            <Container className={"bannerContainer"}>
                <Image src={main_banner} className={"mt-3 mb-3"}></Image>
            </Container>
            <Container className={"tabContainer"}>
                <Nav defaultActiveKey="/home" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href="/best">베스트</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-1" href="/newProducts">신상품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-2" href="/fruitList/1">사과/배</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-3" href="/fruitList/2">귤/한라봉/감귤류</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-4" href="/fruitList/3">수박/메론/참외</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-5" href="/fruitList/4">딸기/블루베리/베리류</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-6" href="/fruitList/5">그 외 과일</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </>
    )
}

export default navbar