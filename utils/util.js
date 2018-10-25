const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const pictureName = function(name) {
  let nameArray = name.split(".");
  let len = nameArray.length;
  let pos = nameArray[len-2].indexOf("_")
  if (pos === -1) {
    return nameArray[len - 2] + '.' + nameArray[len - 1]    
  } else {
    return nameArray[len-2].slice(pos+1) + '.' + nameArray[len-1]
  }
}

const bookurl = function(number) {
  const key = "50f7447a0810b4cfca214e302025f913";
  let id = [242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257];
  let idnumber = Math.ceil(Math.random()*17);
  let rambdaNumber = number || Math.ceil(Math.random() * 30);
  let url = 'http://apis.juhe.cn/goodbook/query?key=' + key + '&catalog_id=' + id[idnumber] + '&rn=6&pn=' + rambdaNumber;

  return url;
}

const weather = function(a) {
  // if (a.indexOf('雪') > -1) {
  //   return ['&#xe623;', '#436EEE']
  // } else if (a.indexOf('雷') > -1) {
  //   return ['&#xe61e;', '#CD3700']
  // } else if (a.indexOf('雨') > -1) {
  //   return ['&#xe682;', '#87CEFA']
  // } else if (a.indexOf('雾') > -1) {
  //   return ['&#xe6f2;', '#C7C7C7']
  // } else if (a.indexOf('阴') > -1) {
  //   return ['&#xe624;', '#B7B7B7']
  // } else if (a.indexOf('多云') > -1) {
  //   return ['&#xe61d;', '#8F8F8F']
  // } else {
  //   return ['&#xe603;', '#FFFF00']
  // }
  if (a.indexOf('雪') > -1) {
    return ['icon-xue', '#436EEE']
  } else if (a.indexOf('雷') > -1) {
    return ['icon-leidian', '#CD3700']
  } else if (a.indexOf('雨') > -1) {
    return ['icon-tianqi-yu', '#87CEFA']
  } else if (a.indexOf('雾') > -1) {
    return ['icon-wu', '#C7C7C7']
  } else if (a.indexOf('阴') > -1) {
    return ['icon-yintian', '#D0D0D0']
  } else if (a.indexOf('多云') > -1) {
    return ['icon-duoyun', '#9c3']
  } else {
    return ['icon-tubiaozhizuomoban', '#FFCC00']
  }
}

/*
@*books/books
@*pragram books页面，用来将购买链接转换为数组，放在页面渲染
*/
const sliceString = function(array) {
  return array.map((item) => {
    let index = item.indexOf(':')
    return {
      store: item.slice(0, index),
      link: item.slice(index+1)
    }
  })
}

const sliceToArray = function(online,array) {
  let onlineArray = []
  for(let i = 0,len=array.length; i < len; i++) {
    onlineArray.push(online.slice(array[i], array[i+1]))
  }
  let result = sliceString(onlineArray)
  return result
}

const onlineIndex = function(online) {
  let DDindex, JDindex, AMZindex, SNindex, onlineArray = []
  DDindex = online.indexOf('当当')
  JDindex = online.indexOf('京东')
  AMZindex = online.indexOf('亚马逊')
  SNindex = online.indexOf('苏宁易购')
  if (JDindex > -1) {
    onlineArray.push(JDindex)
  }
  if (DDindex > -1) {
    onlineArray.push(DDindex)
  }
  if (SNindex > -1) {
    onlineArray.push(SNindex)
  }
  if (AMZindex > -1) {
    onlineArray.push(AMZindex)
  }

  let result = sliceToArray(online, onlineArray)
  for (let i = 0, len = result.length; i < len; i++) {
    if (result[i].store === '亚马逊') {
      result[i].link = decodeURI(result[i].link)
    }
  }
  return result
}


/*
/weather/weather/ 页面  用于将日期中的实时温度提取出来
*/
const real_time_temperature = function(string) {
  string = string.slice(string.indexOf('实时'))
  var reg = /\d+/g;
  let result = string.match(reg);
  return result;
}

const tecentToBaidu = function (lng, lat) {

  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng;
  let y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta) + 0.0065;
  let lats = z * Math.sin(theta) + 0.006;
  return {
    lng: lngs,
    lat: lats
  }
}

const baiduMapSuccess = function(data) {
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  pictureName: pictureName,
  bookurl: bookurl,
  weather: weather,
  onlineIndex: onlineIndex,
  real_time_temperature: real_time_temperature,
  tecentToBaidu: tecentToBaidu
}
