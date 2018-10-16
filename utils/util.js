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

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  pictureName: pictureName
}
