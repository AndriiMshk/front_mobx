import {observer} from 'mobx-react-lite'
import {Todolist} from "./components/todolist/Todolist";
import {Login} from "./components/login/Login";
import store from "./store/store";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import style from './components/login/login.module.scss'


export const App = observer(() => {

  const {app} = store

  const handleExit = () => {
    app.setLogOut()
  }

  useEffect(() => app.getIsLogin, [])

  if (app.isInitialized) return <div className={style.loading}>loading...</div>

  return (
    <>
      {app.isLogin
        ? <div className={style.exit}>
          <div >{app.user.login}</div>
          <button onClick={handleExit}>exit</button>
        </div>
        : <div className={style.help}>
          <p><span className={style.title}>Login: </span>70688kv@ukr.net</p>
          <p><span className={style.title}>Password: </span>123123123123</p>
        </div>}
      <Routes>
        <Route path={'/'} element={<Todolist/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>
    </>
  );
})