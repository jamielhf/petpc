/**
 * Created by linhaifeng on 2017/2/10.
 */

import * as types from '../mutation'
import api from '../../api/api'


const state = {

}

const getters = {

}

const actions = {
    setComments(commit,data){
     api.setComments(data,function (res) {
         console.log(res);

     })
    }
}


const mutations = {

}


export default {
    state,
    getters,
    actions,
    mutations
}