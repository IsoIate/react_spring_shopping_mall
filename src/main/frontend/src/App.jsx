import React from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Best from "./pages/Best.jsx"
import NewProducts from "./pages/NewProducts.jsx"
import AllProducts from "./pages/AllProducts.jsx"
import FruitList from "./pages/FruitList.jsx"
import Detail from "./pages/Detail.jsx";
import FruitInsert from "./pages/FruitInsert.jsx";
import Cart from './pages/Cart.jsx';
import Purchase from './pages/Purchase.jsx';
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from './store/categorySlice.js';

function App() {

    let dispatch = useDispatch();
    dispatch(setCategory());

    return (
        <>
            <Routes>
                <Route path={"/"} element={<MainPage></MainPage>} />
                <Route path={"/login"} element={<Login></Login>} />
                <Route path={"/register"} element={<Register></Register>} />
                <Route path={"/best"} element={<Best></Best>} />
                <Route path={"/newProducts"} element={<NewProducts></NewProducts>} />
                <Route path={"/allProducts"} element={<AllProducts></AllProducts>} />
                <Route path={"/fruitList/:id"} element={<FruitList></FruitList>} />
                <Route path={"/detail/:id"} element={<Detail></Detail>} />
                <Route path={"/cart/:id"} element={<Cart></Cart>} />
                <Route path={"/purchase/:id"} element={<Purchase></Purchase>} />
                <Route path={"/fruitInsert"} element={<FruitInsert></FruitInsert>} />
                <Route path={"*"} element={<div> 없는 페이지입니다. </div>} />
            </Routes>
        </>
    );
}

export default App
