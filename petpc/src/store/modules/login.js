/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
    loginStatus:false,
    singUpInfo:{},
    singInInfo:{},
}

const getters = {
    singUpStatus : state => state.singUpInfo.status,
    singInStatus : state => state.singInInfo.status,
}


const actions = {
    signup({commit},data){
        api.signup(data,function (res) {
            commit(types.SIGNUP_STATUS,res)
        })
    },
    signin({commit},data){
        api.signin(data,function (res) {
            commit(types.SIGNIN_STATUS,res)
        })
    },
    setSignStatus({commit},data){
        commit(types.SET_SIGN_STATUS,data);
    }
}

const mutations = {
    [types.SIGNUP_STATUS](state,res){
        state.singUpInfo = res;
    },
    [types.SIGNIN_STATUS](state,res){
        state.singInInfo = res;
    },
    [types.SET_SIGN_STATUS](state,res){
        state.loginStatus = res;
       
    }
}


export  default{
    state,
    getters,
    actions,
    mutations,
}