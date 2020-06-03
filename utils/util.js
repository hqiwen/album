const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function findPhoto(monthArray, monthIndex, index) {
  let photos = monthArray.find(val => parseInt(val.month) - 1 === monthIndex).photos || []
  let photo = photos && photos[index]
  return photo
}

function findNextPhoto(monthArray, monthIndex, index, turn) {
  if (turn === 'left') {
    index++;
    if (index > monthArray[monthIndex].photos.length - 1) {
      monthIndex++
      index = monthIndex < monthArray.length ? 0 : monthArray[monthIndex - 1].photos.length - 1
      monthIndex = Math.min(monthIndex, monthArray.length - 1)
    }
  } else if (turn === 'right') {
    index--;
    if (index < 0) {
      monthIndex--
      index = monthIndex < 0 ? 0 : monthArray[monthIndex].photos.length - 1
      monthIndex = Math.max(monthIndex, 0);
    }
  }
  let photo = findPhoto(monthArray, monthIndex, index)
  return {
    photo,
    newMonthIndex: monthIndex,
    newIndex: index,
  }
}


module.exports = {
  findPhoto,
  findNextPhoto,
  formatTime: formatTime
}
