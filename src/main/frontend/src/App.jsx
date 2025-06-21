import React from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx"
import Best from "./pages/Best.jsx"
import NewProducts from "./pages/NewProducts.jsx"
import FruitList from "./pages/FruitList.jsx"
import Detail from "./pages/Detail.jsx";
import FruitInsert from "./pages/FruitInsert.jsx";
import Purchase from './pages/Purchase.jsx';
import Test from "./pages/Test.jsx"
import Test2 from "./pages/Test2.jsx";
function App() {
    // const [data, setData] = useState('');
    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/test')
    //         .then(res => setData(res.data))
    //         .catch(err => console.log(err))
    // }, []);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<MainPage></MainPage>} />
                <Route path={"/test/:id"} element={<Test></Test>} />
                <Route path={"/test2"} element={<Test2></Test2>} />
                <Route path={"/best"} element={<Best></Best>} />
                <Route path={"/newProducts"} element={<NewProducts></NewProducts>} />
                <Route path={"/fruitList/:id"} element={<FruitList></FruitList>} />
                <Route path={"/detail/:id"} element={<Detail></Detail>} />
                <Route path={"/purchase/:id"} element={<Purchase></Purchase>} />
                <Route path={"/fruitInsert"} element={<FruitInsert></FruitInsert>} />
                <Route path={"*"} element={<div> 없는 페이지입니다. </div>} />
            </Routes>
        </>
    );
}

export default App
