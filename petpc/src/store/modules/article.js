/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'

const state = {
        imgArr:[],
        content:[]
}

const getters = {
    getImgArr : state => state.imgArr
}


const actions = {
    saveArticle({commit},data){
        commit(types.SET_LOADING,true);
        api.saveArticle(data,function (res) {
            commit(types.SET_LOADING,false);
            if(res.status==200){
                commit(types.SET_TIPS,'投递成功');
            }
        })
    },
    articlePhoto({commit},data){
        commit(types.SET_LOADING,true);
        api.articlePhoto(data,function (res) {
            commit(types.SET_LOADING,false);
            if(res.status==200){
                commit(types.SET_TIPS,'上传成功');
                commit(types.SAVE_ARTICLE_PHOTO,res.data)
            }
        })
    },
    getArticle({commit},data){
        api.getArticle(data,function (res) {
            console.log(res);
        })
    }
    

}

const mutations = {
    [types.SAVE_ARTICLE](state,data){

    },
    [types.SAVE_ARTICLE_PHOTO](state,data){

        state.imgArr.push({photo:data.photo,sPhoto:data.sPhoto})
    },
    [types.REMOVE_ARTICLE_PHOTO](state,key){
        if(key==0){
            state.imgArr = state.imgArr.slice(1);
        }else{
            console.log(parseInt(key)+1);
            state.imgArr = state.imgArr.slice(0,key).concat(state.imgArr.slice(parseInt(key)+1));
        }

    },

}


export  default{
    state,
    getters,
    actions,
    mutations,
}