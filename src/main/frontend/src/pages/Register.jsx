import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import Navbar from "../components/Navbar"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        email: '',
        adress: '',
        detailAdress: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const regex = /[^0-9\-]/;

        if (form.username.length < 4 | form.password.length < 4) {
            setError("아이디 또는 패스워드가 너무 짧습니다.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (regex.test(form.phoneNumber)) {
            setError("휴대폰 번호를 확인해 주세요.");
            return;
        }

        form.phoneNumber = form.phoneNumber.replace(/-/g, "");

        try {
            axios.post("/api/register", form,)
                .then((res) => {
                    navigate("/");
                })
                .catch((e) => {
                    console.log(e)
                })

            setSuccess(true);
            setError('');
        } catch (err) {
            console.log(err)
            setError('회원가입 실패. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px", marginTop: "5%" }}>
                <Card style={{ width: '100%', maxWidth: '450px' }} className="p-4 shadow-sm">
                    <h3 className="text-center mb-4">회원가입</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">회원가입 성공!</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control name="username" type="text" value={form.username} onChange={handleChange} required placeholder="4글자 이상" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control name="password" type="password" value={form.password} onChange={handleChange} required placeholder="4글자 이상" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required placeholder="4글자 이상" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>이름</Form.Label>
                            <Form.Control name="name" type="text" value={form.name} onChange={handleChange} required placeholder="홍길동" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>휴대폰 번호</Form.Label>
                            <Form.Control name="phoneNumber" type="text" value={form.phoneNumber} onChange={handleChange} required placeholder="010-1234-1234" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required placeholder="fruit@korea.ac.kr" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <Form.Control name="adress" type="text" value={form.adress} onChange={handleChange} required placeholder="ex) OO시, 군, 구 " />
                            <Form.Control className="mt-1" name="detailAdress" type="text" value={form.detailAdress} onChange={handleChange} required placeholder="ex) 동, 호수" />
                        </Form.Group>

                        <Button type="submit" className="w-100">회원가입</Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Register;
