/**
 * foo模块 接口列表
 */

 import base from '../base' // 导入接口域名列表
 import axios from '../../utils/http' // 导入 http 中创建的 axios 实例
 import qs from 'qs'; // 根据需求是否导入 node 里的 qs模块 

 const foo = {
   fooGetSomeThing(){
     return axios.get(`${base.serverRequest}/someInfo`);
   },
   fooGetOtherThing(id, param){
    return axios.get(`${base.serverRequest}/otherInfo/${id}`,{
      params: param
    })
   },
   // post
   login(params) {
     return axios.post(`${base.serverRequest}/accesstoken`,qs.stringify(params) );
   }
 }


 export default foo;