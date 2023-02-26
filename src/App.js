import {observer} from 'mobx-react-lite'
import {Todolist} from "./components/Todolist";
import {Login} from "./components/Login";
import store from "./store/store";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";


export const App = observer(() => {

    const {app} = store

    const handleExit = () => {
        app.setLogOut()
    }

    useEffect(() => app.getIsLogin, [])

    if (app.isInitialized) return <div>loading</div>

    return (
        <>
            <div>
                {app.user.login}
                {app.isLogin
                    ? <button onClick={handleExit}>exit</button>
                    : <>
                        <p>70688kv@ukr.net</p>
                        <p>123123123123</p>
                    </>}
            </div>
            <Routes>
                <Route path={'/'} element={<Todolist/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </>
    );
})