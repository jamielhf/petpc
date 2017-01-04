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
    getToken : state => state.info.getToken,
    getInfo : state => state.info,
    getHead : state => state.info.head
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
    },

    signout({commit}){
        localStorage.token = '';
        commit(types.SET_SIGN_STATUS,{status:false,data:{}});
        commit(types.SIGN_STATUS,{status:false,data:''});

    },
    changeInfo({commit},data){
        commit(types.SET_LOADING,true);
        api.changeInfo(data,function (res) {
            commit(types.SET_LOADING,false);
            console.log(res)
            if(res.status==200){
                commit(types.SET_USER_INFO,res.data);

            }
            commit(types.SET_TIPS,res.msg);

        })

    },
    setHead({commit},data){
        api.setHead(data,function (res) {
            console.log(res);
        })
    }


};

const mutations = {
    [types.SIGN_STATUS](state,res){
        state.status = res.status;
        state.info = res.data;
        console.log(res)
        if(res.data!=''){
            state.loginStatus = true;
        }

    }
    ,
    [types.SET_USER_INFO](state,res){
        state.info = res

    },
    [types.SET_SIGN_STATUS](state,res){

        state.loginStatus = res.status;
        if(!state.loginStatus){
            localStorage.token = '';
        }
        state.info = res.data;
    },


}


export  default{
    state,
    getters,
    actions,
    mutations,
}