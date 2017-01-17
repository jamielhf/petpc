/**
 * Created by linhaifeng on 2017/1/17.
 */


const util = {
    changeTime(time){
        let now = (new Date().getTime()/1000);

        let t = (now - (new Date(time).getTime()/1000))/3600 ;
        if(t<24){
            if(parseInt(t)==0){
                time = '刚刚'
            }else{
                time = parseInt(t)+'小时前';
            }
        }else if(t<720){
            time = parseInt(t/24)+'天前'
        }else if(t<8640){
            time = parseInt(t/720)+'月前'
        }else{
            time = parseInt(t/8640)+'年前'
        }

        return time

    }
}


export default util