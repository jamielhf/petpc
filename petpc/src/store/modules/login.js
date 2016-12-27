/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
    loginStatus:false,
    info:{},
    status:{},
}

const getters = {
    signStatus : state => state.status,
    isLogin : state => state.loginStatus,
    getToken : state => state.info.getToken
}


const actions = {
    signup({commit},data){
        api.signup(data,function (res) {
            commit(types.SIGN_STATUS,res)
        })
    },
    signin({commit},data){
        api.signin(data,function (res) {
            commit(types.SIGN_STATUS,res)
        })
    },
  
    checkedLogin({commit}){
       api.checkLogin(function (res) {
           commit(types.SET_SIGN_STATUS,res);
       })
    }
}

const mutations = {
    [types.SIGN_STATUS](state,res){
        state.status = res.status;
        state.info = res.data;
        if(state.info){
            state.loginStatus = true
        }
    }
    ,

    [types.SET_SIGN_STATUS](state,res){
        state.loginStatus = res.status;
        state.info = res.data;
    }
}


export  default{
    state,
    getters,
    actions,
    mutations,
}