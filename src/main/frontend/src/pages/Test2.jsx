// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // TODO: 실제 로그인 API 요청 보내기
            // 예: axios.post("/api/auth/login", { username, password })

            console.log('로그인 요청:', { username, password });

            // 로그인 성공 시 토큰 저장 및 리디렉션 처리
        } catch (err) {
            setError('로그인 실패. 다시 시도해주세요.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm">
                <h3 className="text-center mb-4">로그인</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Button type="submit" className="w-100">로그인</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default LoginPage;
