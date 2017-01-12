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
    getImgArr : state => state.imgArr,
    getArticleList : state => state.content
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
        console.log(data);
        return new Promise((resolve, reject) => {
                api.getArticle(data,function (res) {
                    if(res.status==200){
                        commit(types.GET_ARTICLE,res.data)
                    }else{
                        commit(types.SET_TIPS,res.msg);
                    }
                    resolve()
                })
        })

    }
    

}

const mutations = {
    [types.SAVE_ARTICLE](state,data){

    },
    [types.GET_ARTICLE](state,data){
         if(data.length>0){
             let t;
             let now = (new Date().getTime()/1000);

             for(let i=0;i<data.length;i++){
                 t = (now - (new Date(data[i].time).getTime()/1000))/3600 ;
                 if(t<24){
                     if(parseInt(t)==0){
                         data[i].time = '刚刚'
                     }else{
                         data[i].time = parseInt(t)+'小时前';
                     }

                 }else if(t<720){
                     data[i].time = parseInt(t/24)+'天前'
                 }else if(t<8640){
                     data[i].time = parseInt(t/720)+'月前'
                 }else{
                     data[i].time = parseInt(t/8640)+'年前'
                 }

             }
         }
        
         state.content = data;
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