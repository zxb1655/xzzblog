import {combineReducers} from 'redux'
import loginReducer from './login_recuder'
import menuRecuder from './menu_recuder'
//整合所有reducer汇总所有状态
export default combineReducers({
  //该对象里的key和value决定着store里保存该状态的key和value
  userInfo:loginReducer,
  title:menuRecuder
})
