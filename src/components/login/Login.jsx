import {useEffect, useState} from "react";
import store from "../../store/store";
import {useNavigate} from "react-router-dom";
import style from './login.module.scss'

export const Login = () => {

  const navigate = useNavigate()
  const {app} = store

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

  useEffect(() => {
    if (app.isLogin) navigate('/')
  }, [app.isLogin])

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={style.label}>login</div>
          <input type="text" value={data.email} onChange={handlerChangeEmail}/>
        </div>
        <div>
          <div className={style.label}>password</div>
          <input type="text" value={data.password} onChange={handlerChangePassword}/>
        </div>
        <button type={'submit'}>sign</button>
      </form>
    </div>
  );
}

