import React from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import  MainPage from "./pages/MainPage.jsx"
import Test from "./pages/Test.jsx"
import Detail from "./pages/Detail.jsx";
import FruitInsert from "./pages/FruitInsert.jsx";
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
                <Route path={"/"} element={ <MainPage></MainPage>} />
                <Route path={"/test"} element={ <Test></Test> } />
                <Route path={"/detail/:id"} element={ <Detail></Detail> } />
                <Route path={"/fruitInsert"} element={ <FruitInsert></FruitInsert> } />
                <Route path={"*"} element={ <div> 없는 페이지입니다. </div>}/>
            </Routes>
        </>
    );
}

export default App
