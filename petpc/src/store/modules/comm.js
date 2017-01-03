/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
    isLoading:false
}

const getters = {
    isLoading:state => state.isLoading
}


const actions = {
    loading({commit},data){
        commit(types.SET_LOADING,data)
    }


}

const mutations = {
    [types.SET_LOADING](state,data){
        state.isLoading = data
    }

}


export  default{
    state,
    getters,
    actions,
    mutations,
}