import {useEffect, useState} from "react";
import store from "../store/store";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()
    const {app} = store

    const [error, setError] = useState('')

    const emptyFields = {email: '', password: ''}
    const [data, setData] = useState(emptyFields)

    const handleSubmit = (e) => {
        e.preventDefault()
        app.setLogIn(data)
        setData(emptyFields)
    }

    const handlerChangeEmail = (e) => {
        setData((prevState) => ({...prevState, email: e.target.value}))
    }

    const handlerChangePassword = (e) => {
        setData((prevState) => ({...prevState, password: e.target.value}))
    }

    useEffect(()=> {
        if (app.isLogin) navigate('/')
    }, [app.isLogin])

    return (
        <div>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
            <input type="text" value={data.email} onChange={handlerChangeEmail}/>
            <input type="text" value={data.password} onChange={handlerChangePassword}/>
            <button type={'submit'}>sign</button>
            </form>
        </div>
    );
}

