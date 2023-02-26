import {observer} from 'mobx-react-lite'
import store from "../store/store";

export const Counter = observer(() => {

    const {count} = store

    return (
            <div>
                <div>{count.count}</div>
                <button onClick={() => count.add()}>++++</button>
                <button onClick={() => count.remove()}>----</button>
                <button onClick={() => count.reset()}>xxxx</button>
            </div>
    );
})

