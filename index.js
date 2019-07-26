
const initProps = (results, keys) => {
  if(!results || !keys){
    console.error("请传入参数props, results, keys");
    return;
  }

  let props = {};

  if(keys instanceof Array && keys.length === 1){
    if(typeof keys[0] === "string"){
      keys = keys[0];
    } else {
      console.error("keys值必须是字符串，或者是字符串形式的数组");
      return;
    }
  }

  if(results instanceof Array && results.length === 1){
    results = results[0];
  }

  if(results instanceof Array){
    results.forEach((item, index) => {
      let value =
          typeof item === "object" ?
            JSON.parse(JSON.stringify(item)) :
            item,
        key =
          keys instanceof Array ?
            keys[index] ?
              keys[index] :
              console.error("请配置与“results”个数相同的“key”值"):
            console.error("keys值必须是字符串，或者是字符串形式的数组");

      if(!key || !value){
        return;
      }
      props[key] = value;
    });
  } else if(results && keys){
    props[keys] = results;
  }

  return props;
};

const getProps = (_this, state) => {
  if(!_this || !state){
    console.error("请传入参数_this, state");
    return;
  }

  let {initProps} = _this.props;
  _this.disabledProps = _this.disabledProps || {};

  if(initProps && initProps[state] && !_this.disabledProps[state]){
    _this.disabledProps[state] = true;
    return initProps[state];
  }

  return undefined;
};

const NextHttp = {
  initProps,
  getProps
};


module.exports = NextHttp;
