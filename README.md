### 语言
[English](https://github.com/kszitt/next-initial-request/blob/master/README_EN.md)

### 描述
next.js框架数据请求、获取插件。  

### 安装
``` javascript
npm install next-initial-request --save-dev
```

### 创建http请求（举例）  
``` javascript
async function GetActivityById(id){
  let response = await axios.get(`/api/v1/activity/info/${id}`);

  return response.data;
}
async function getActivity(params){
  let response = await axios.get(`/api/v1/activity/all`, {params});

  return response.data;
}
```
### 引入
``` javascript
import NextHttp from "next-initial-request"
// or
const NextHttp = require("next-initial-request");
```
### 服务端请求数据
``` javascript
static async getInitialProps ({req, pathname, query}) {
  let props = {};

  if(req){
    // 并发
    let results = await Promise.all([
      getActivityById(query.id),
      getActivity(),
    ]);
    /* // 同步请求（根据接口的数据请求接口时，可以用这种方式）
    let results = [];
    results[0] = await getActivityById(query.id);
    results[2] = await getActivity(); */

    props.initProps = NextHttp.initProps(results, ["activity", "activityAll"]);
  }

  return props;
}
```
### 客户端获取数据
``` javascript
async getActivity(){
    let params = {
        page: 1,
        perpage: 5
      },
      // NextHttp.getProps()只会在服务端渲染一次，客户端直接请求
      data = NextHttp.getProps(this, "activityAll") || await getActivity(params),
      activityAll = [];

    if(data.code === 200){
      activityAll = data.items;
    }

    this.setState({
      activityAll
    })
  }
```
### .initProps(results, keys)  
服务端请求数据保存到`props`中  
- results{ array|object } 要保存的数据，必须
- keys{ string:array | string } 数据绑定的key值，必须
### .getProps(this, key)  
从`props`中获取数据（只会在服务端请求一次）
- this{ object } 传入当前组件的`this`，必须
- key{ string:array | string } 从`props`中根据`key`提取数据，必须
