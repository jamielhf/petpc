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
    signStatus : state => state.status
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
    setSignStatus({commit},data){
        commit(types.SET_SIGN_STATUS,data);
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
    },

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