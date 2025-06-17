import "../css/FruitInsert.css"
import axios from "axios";
import {useEffect, useState} from "react";
import localUrl from "../js/common.js";
import {useNavigate} from "react-router-dom";

function FruitInsert() {

    let [title, setTitle] = useState('');
    let [price, setPrice] = useState('');
    let [quantity, setQuantity] = useState('');
    let [imgUrl, setImgUrl] = useState('');
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

        if(data === "price")
            setPrice(onlyNums);
        else if(data === "qy")
            setQuantity(onlyNums);
    }

    // AWS S3에 이미지 파일 저장하는 코드
    async function getURL(e) {
        let file = e.target.files[0];
        let name = encodeURIComponent(file.name);

        let response = await fetch(`/api/presigned-url?filename=${name}`);
        let {putUrl, getUrl} = await response.json();

        let res = await fetch(putUrl, {
            method: "PUT",
            body: file
        });

        if (res.ok) {
            getUrl = getUrl.split("?")[0];
            document.querySelector("img").src = getUrl;
            setImgUrl(getUrl);
        }
    }

    return (<>
        <div>
            <form action="/fruitInsert" method="POST">
                <div className="writeFormDiv">
                    <div className="writeDiv">
                        <h4> 과일 이름 </h4>
                        <input type="text" name="fruitName" onChange={(e) => {setTitle(e.target.value)}}/>
                    </div>
                    <div className="writeDiv">
                        <h4> 가격 </h4>
                        <input type="text" name="price" value={price} onChange={(e) => {inputNumber(e, "price")}}/>
                    </div>
                    <div className="writeDiv">
                        <h4> 과일 갯수 </h4>
                        <input type="text" name="quantity" value={quantity} onChange={(e) => {inputNumber(e, "qy")}}/>
                    </div>
                    <input type="hidden" name="imageURL" id="imageURL"/>
                    <div className="writeDiv">
                        <h4> 과일 이미지 </h4>
                        <input type="file" onChange={(e) => {
                            getURL(e)
                        }}/>
                    </div>
                    <div className="writeDiv">
                        <h4> 과일 이미지 미리보기 </h4>
                        <img style={{width: "60%"}}/>
                    </div>
                    <button type="button" onClick={() => {
                        formSubmit();
                    }}> 전송
                    </button>
                </div>
            </form>
        </div>
    </>)
}

export default FruitInsert