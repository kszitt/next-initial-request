### Language
[简体中文](https://github.com/kszitt/next-initial-request/blob/master/README.md)

### Description
Next.js Framework Data Request and Access Plug-in 

### Install
``` javascript
npm install next-initial-request --save-dev
```

### Create HTTP requests (example)  
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
### import
``` javascript
import NextHttp from "next-initial-request"
// or
const NextHttp = require("next-initial-request");
```
### Server requests data
``` javascript
static async getInitialProps ({req, pathname, query}) {
  let props = {};

  if(req){
    // Concurrent
    let results = await Promise.all([
      getActivityById(query.id),
      getActivity(),
    ]);
    /* // sync request (When requesting an interface based on the data of the interface, you can use this method)  
    let results = [];
    results[0] = await getActivityById(query.id);
    results[2] = await getActivity(); */

    props.initProps = NextHttp.initProps(results, ["activity", "activityAll"]);
  }

  return props;
}
```
### Client access data
``` javascript
async getActivity(){
    let params = {
        page: 1,
        perpage: 5
      },
      // NextHttp.getProps() Only once rendered on the server side, directly requested by the client
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
The server requests data to be saved in `props`
- results{ array|object } Data to be saved, request
- keys{ string:array | string } The key value of data binding, request
### .getProps(this, key)  
Getting data from `props` (request only once on the server side)
- this{ object } The `this`passed into the current component, request
- key{ string:array | string } Extracting data from `props` according to `key`, request
