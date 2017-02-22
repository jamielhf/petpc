/**
 * Created by linhaifeng on 2017/2/10.
 */

import * as types from '../mutation'
import api from '../../api/api'


const state = {
   comments:''
}

const getters = {
    getComments : state => state.comments
}

const actions = {
    setComments({commit},data){
        return new Promise((resolve,reject)=>{
            api.setComments(data,function (res) {
                if(res.status==200){
                    commit('SET_TIPS',res.msg);
                    commit('SET_COMMENTS',res.data);
                    resolve()
                }
            })
        })

    }
}


const mutations = {
    [types.SET_COMMENTS](state,data){

        state.comments = data
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}