/**
 * Created by linhaifeng on 2016/12/23.
 */

import axios from 'axios';

const baseUrl = "http://localhost:3001/";

let token = localStorage.token;

axios.defaults.headers.common['Authorization'] = 'Bearer ' +token;

export  default {

    /*
     * 注册
     * */
    signup: function (data,cb) {

        axios.post(baseUrl+'signup',data).then(function (res) {

            if(res.data.status==200){
                localStorage.token = res.data.data.token;
                localStorage.uid = res.data.data._id;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +res.data.data.token;
            }
                cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });;

    },
    /*
    *
    * 检查是否登录
    * */
    checkLogin:function (cb) {
        axios.get(baseUrl+'signin',{headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(function (res) {

            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });;
    },
    /*
     * 登录
     * */

    signin: function (data,cb) {

        axios.post(baseUrl+'signin',data).then(function (res) {

            if(res.data.status==200){
                localStorage.token = res.data.data.token;
                localStorage.uid = res.data.data._id;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +res.data.data.token;
            }
            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });;

    },
    /*
    *
    * 修改用户名
    *
    * */
    changeInfo:function (data, cb) {
        console.log(data);
        setTimeout(function () {
            axios.post(baseUrl+'user',data).then(function (res) {

                cb(res.data)
            }).catch(function (error) {
                console.log(error);
            });
        },1000)

    },
    /*
    *
    * 修改头像
    * */
    setHead:function (data,cb) {
        axios.post(baseUrl+'user/head',data,{'content-type': 'multipart/form-data'}).then(function (res) {

            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    },
    /*
    *
    *上次文章图片
    * */
    articlePhoto(data,cb){
        axios.post(baseUrl+'articleList/photo',data,{'content-type': 'multipart/form-data'}).then(function (res) {

            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    },
    /*
    *
    * 保存文章
    * */
    saveArticle(data,cb){
        axios.post(baseUrl+'articleList',data).then(function (res) {
            console.log(res.data);
            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    },
    /*
    * 获取文章
    * */
    getArticle(data,cb){
        axios.get(baseUrl+'articleList',{params:data}).then(function (res) {

            cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    },
    /*
    *
    * 收藏
    * */
    setStar(data,cb){
        axios.get(baseUrl+'articleList/star',{params:data}).then(function (res) {

            cb(res.data)

        }).catch(function (error) {
            console.log(error);
        });
    },
    /*
    * 提交评论
    *
    *
    * */
    setComments(data,cb){
        axios.post(baseUrl+'articleList/comments',data).then(function (res) {

                cb(res.data)
        }).catch(function (error) {
            console.log(error);
        });
    }
}


