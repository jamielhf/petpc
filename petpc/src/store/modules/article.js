/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
    article:{

    }
}

const getters = {

}


const actions = {
    saveArticle({commit},data){
        commit(types.SAVE_ARTICLE,data)
    }

}

const mutations = {
    [types.SAVE_ARTICLE](state,data){

    }
}


export  default{
    state,
    getters,
    actions,
    mutations,
}