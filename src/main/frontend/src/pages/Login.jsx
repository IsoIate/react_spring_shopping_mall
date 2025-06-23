import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar"
import axios from 'axios';
import { login } from '../store/authSlice.js';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const postLoginData = async (e) => {
        e.preventDefault();

        axios.post("/api/login", {
            memberId: userId,
            memberPw: password
        }, { withCredentials: true })
            .then((res) => {
                dispatch(login({
                    id: res.data.id,
                    user: res.data.memberName
                }))
                navigate("/")
            })
            .catch((e) => {
                alert("아이디, 비밀번호를 확인해 주세요.")
            })
    };

    return (
        <>
            <Navbar></Navbar>

            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px", marginTop: "5%" }}>
                <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow-sm">
                    <h3 className="text-center mb-4">로그인</h3>
                    <Form onSubmit={postLoginData}>
                        <Form.Group className="mb-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button type="submit" className="w-100">로그인</Button>
                    </Form>
                </Card>
            </Container>
            <Container className="d-flex justify-content-center align-items-center" >
                <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow-sm">
                    <Form.Group className="mb-3">
                        <Form.Label>아직 회원이 아니신 분이라면</Form.Label>
                        <Button type="button" className="w-100 btn-success" onClick={() => { navigate("/register") }}>회원가입</Button>
                    </Form.Group>
                </Card>
            </Container>
        </>
    );
}

export default Login;
