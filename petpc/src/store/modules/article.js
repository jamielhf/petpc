/**
 * Created by linhaifeng on 2016/12/23.
 */
import * as types from '../mutation'
import api from '../../api/api'
import util from '../../js/util'
const state = {
        imgArr:[],
        artList:[],     //文章列表
        content:[]  //文章详情
}

const getters = {
    getImgArr : state => state.imgArr,
    getArticleList : state => state.artList,
    getArticleContent : state => state.content
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
    //文章列表
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

    },
    //文章详情
    getArticleContent({commit},data){
        return new Promise((resolve, reject) => {
            api.getArticle(data,function (res) {
                console.log(res);
                if(res.status==200){
                    commit(types.GET_ARTICLE_CONTENT,res.data)
                }else{
                    commit(types.SET_TIPS,res.msg);
                }
                resolve()
            })
        })
    },
//   点赞
    setArticleStar({commit},data){

        api.setStar(data,(res)=>{
           commit(types.SET_ARTICLE_STAR,data)

        })

    }

}

const mutations = {
    [types.SAVE_ARTICLE](state,data){

    },
    [types.GET_ARTICLE](state,data){
         if(data.length>0){


             for(let i=0;i<data.length;i++){

                     data[i].time =   util.changeTime(data[i].time);


             }
         }
        
         state.artList = data;
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

    [types.GET_ARTICLE_CONTENT](state,data){
        data.time = util.changeTime(data.time);
        state.content = data;
    },
    /*
    *
    * @aid 文章id
    * */
    [types.SET_ARTICLE_STAR](state,data){

        let [l,i] = [state.artList.length,0];
        for(;i<l;i++){
            if(state.artList[i]._id == data.aid){

                if(data.star){
                    state.artList[i].star++;
                    state.artList[i].isStar  = true;

                }else{
                    state.artList[i].star--;
                    state.artList[i].isStar  = false;
                }

            }
        }
    }

}

export  default{
    state,
    getters,
    actions,
    mutations,
}