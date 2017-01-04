/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
    isLoading:false,
    isTips:false,
    tips:''
}

const getters = {
    isLoading:state => state.isLoading,
    isTips:state => state.isTips,
    tips:state => state.tips,
}


const actions = {
    loading({commit},data){
        commit(types.SET_LOADING,data)
    },
    tips({commit},data){
        commit(types.SET_TIPS,data)
    }

}

const mutations = {
    [types.SET_LOADING](state,data){
        state.isLoading = data
    },
    [types.SET_TIPS](state,data){

        state.tips = data
     
    }

}


export  default{
    state,
    getters,
    actions,
    mutations,
}