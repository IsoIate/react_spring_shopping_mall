import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Test2() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('폼 제출:', form);
        // TODO: 서버 전송 로직 추가
    };

    return (
        <Container className="py-5" style={{ maxWidth: '600px' }}>
            <h3 className="mb-4 text-center">문의하기</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@email.com"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>메시지</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        placeholder="내용을 입력하세요"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formFile">
                    <Form.Label> 상품 이미지 </Form.Label>
                    <Form.Control
                        type="file"/>
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">
                        제출하기
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Test2;
