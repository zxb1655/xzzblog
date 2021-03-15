//最核心的管理者--store
//从redux中引入createStore，用于创建最核心的store对象
import {createStore,applyMiddleware} from 'redux' 
//引入reducer
import reducers from './reducers'
//引入redux-thunk
import thunk from 'redux-thunk'
//引入redux-devtools-extension，用于支持redux开发者调试工具的运行
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))