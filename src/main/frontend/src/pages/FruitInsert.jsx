import "../css/FruitInsert.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
import localUrl from "../js/common.js";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Image } from "react-bootstrap";
import Navbar from "../components/Navbar.jsx";

function FruitInsert() {

    let [title, setTitle] = useState('');
    let [price, setPrice] = useState('');
    let [quantity, setQuantity] = useState('');
    let [imgUrl, setImgUrl] = useState(null);
    let navigate = useNavigate();

    function formSubmit() {
        let form = document.querySelector('form');
        let formData = new FormData(form);
        formData.append("imgUrl", imgUrl);

        if (!confirm("상품을 등록하시겠습니까?")) return false;

        if (title.trim() === "" || price.trim() === "") {
            alert("제목 또는 가격을 확인 해 주십시오.")
            return false;
        }

        axios.post("/api/fruitInsert", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("업로드 완료:", res)
                navigate("/")
            })
            .catch((err) => console.error("에러 발생:", err));
    }

    function inputNumber(e, data) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");

        if (data === "price")
            setPrice(onlyNums);
        else if (data === "qy")
            setQuantity(onlyNums);
    }

    // AWS S3에 이미지 파일 저장하는 코드
    async function getURL(e) {
        let file = e.target.files[0];
        let name = encodeURIComponent(file.name);

        let response = await fetch(`/api/presigned-url?filename=${name}`);
        let { putUrl, getUrl } = await response.json();

        let res = await fetch(putUrl, {
            method: "PUT",
            body: file
        });

        if (res.ok) {
            getUrl = getUrl.split("?")[0];
            // document.querySelector("img").src = getUrl;
            setImgUrl(getUrl);
            setForm({ ...form, "imgUrl": imgUrl })
        }
    }




    const [form, setForm] = useState({
        title: '',
        price: 0,
        quantity: 0,
        unit: '',
        detailInfo: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const totalForm = { ...form, "imgUrl": imgUrl };

        if (!confirm("상품을 등록하시겠습니까?")) return false;

        axios.post("/api/fruitInsert", totalForm, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("업로드 완료:", res)
                navigate("/")
            })
            .catch((err) => console.error("에러 발생:", err));
    };

    return (
        <>
            <Navbar></Navbar>   {/*관리자 nav로 변경 필요*/}
            <Container className="py-5" style={{ maxWidth: '600px' }}>
                <h3 className="mb-4 text-center"> 상품 등록 </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label> 상품명 </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="상품명을 입력하세요"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label> 가격 </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="가격을 입력하세요"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label> 수량 </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="수량을 입력하세요"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUnit">
                        <Form.Label> 단위 </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex) 1 Box (1kg)"
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formDetailInfo">
                        <Form.Label> 상품 정보 상세 </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="detailInfo"
                            placeholder="상세 내용을 입력하세요"
                            value={form.detailInfo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formImage">
                        <Form.Label> 상품 이미지 </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => { getURL(e) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formImageView">
                        <Form.Label> 이미지 미리보기 </Form.Label>
                        <Image className="w-100 imageView" src={imgUrl} />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" size="lg" type="submit">
                            제출하기
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
        //     <>
        //     <div>
        //         <form action="/fruitInsert" method="POST">
        //             <div className="writeFormDiv">
        //                 <div className="writeDiv">
        //                     <h4> 과일 이름 </h4>
        //                     <input type="text" name="fruitName" onChange={(e) => {setTitle(e.target.value)}}/>
        //                 </div>
        //                 <div className="writeDiv">
        //                     <h4> 가격 </h4>
        //                     <input type="text" name="price" value={price} onChange={(e) => {inputNumber(e, "price")}}/>
        //                 </div>
        //                 <div className="writeDiv">
        //                     <h4> 과일 갯수 </h4>
        //                     <input type="text" name="quantity" value={quantity} onChange={(e) => {inputNumber(e, "qy")}}/>
        //                 </div>
        //                 <input type="hidden" name="imageURL" id="imageURL"/>
        //                 <div className="writeDiv">
        //                     <h4> 과일 이미지 </h4>
        //                     <input type="file" onChange={(e) => {
        //                         getURL(e)
        //                     }}/>
        //                 </div>
        //                 <div className="writeDiv">
        //                     <h4> 과일 이미지 미리보기 </h4>
        //                     <img style={{width: "60%"}}/>
        //                 </div>
        //                 <button type="button" onClick={() => {
        //                     formSubmit();
        //                 }}> 전송
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </>
    )
}

export default FruitInsert