// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import Navbar from "../components/Navbar"

function Register() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // axios.post("/api/register", {
    //     memberId: "123",
    //     memberPw: "1234"
    // },)
    //     .then((res) => {
    //         console.log(res)
    //     })
    //     .catch((e) => {
    //         console.log(e)
    //     })

    const handleRegister = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // TODO: 실제 회원가입 API 요청 보내기
            // 예: axios.post("/api/auth/register", form)

            console.log('회원가입 요청:', form);
            setSuccess(true);
            setError('');
        } catch (err) {
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
                            <Form.Control name="username" type="text" value={form.username} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control name="password" type="password" value={form.password} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
                        </Form.Group>

                        <Button type="submit" className="w-100">회원가입</Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Register;
