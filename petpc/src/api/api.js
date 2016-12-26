/**
 * Created by linhaifeng on 2016/12/23.
 */

import axios from 'axios';

const baseUrl = "http://localhost:3000/";

export  default {

    /*
     * 注册
     * */
    signup: function (data,cb) {

        axios.post(baseUrl+'signup',data).then(function (res) {
            console.log(res.data);
                cb(res.data)
        });

    },
    /*
    *
    * 检查是否登录
    * */
    checkLogin:function (cb) {
        axios.get(baseUrl+'signin').then(function (res) {
            console.log(res.data);
            cb(res.data)
        });
    },
    /*
     * 登录
     * */

    signin: function (data,cb) {

        axios.post(baseUrl+'signin',data).then(function (res) {
            console.log(res.data);
            cb(res.data)
        });

    }

}


// axios.post(baseUrl+'index/getList').then(function (res) {
//     if (res.data.data.code == 1000) {
//         setTimeout(function () {
//             cb(res.data.data.data);
//         }, 300)
//     }
//
// });