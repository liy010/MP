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
    return ['icon-yintian', '#B7B7B7']
  } else if (a.indexOf('多云') > -1) {
    return ['icon-duoyun', '#8F8F8F']
  } else {
    return ['icon-tubiaozhizuomoban', '#FFFF00']
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  pictureName: pictureName,
  bookurl: bookurl,
  weather: weather
}
