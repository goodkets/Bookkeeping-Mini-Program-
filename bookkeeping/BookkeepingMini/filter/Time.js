function times(Str) {
  const dt = new Date(Str)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const ms=m<10 ? "0"+m:m
  const d = dt.getDate()
  const ds=d<10 ? "0"+d:d
  return `${y}年-${ms}月-${ds}日`
}
function timeyear(Str) {
  const dt = new Date(Str)
  const y = dt.getFullYear()
  return `${y}`
}
function timeMonth(Str) {
  const dt = new Date(Str)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const ms=m<10 ? "0"+m:m
  return `${y}${ms}`
}
function timeDay(Str) {
  const dt = new Date(Str)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const ms=m<10 ? "0"+m:m
  const d = dt.getDate()
  const ds=d<10 ? "0"+d:d
  return `${ms}${ds}`
}
function time(Str) {
  const dt = new Date(Str)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const ms=m<10 ? "0"+m:m
  return `${y}年-${ms}月`
}
function timeY(Str) {
  const dt = new Date(Str)
  // const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const ms=m<10 ? "0"+m:m
  const d = dt.getDate()
  const ds=d<10 ? "0"+d:d
  return `${ms}月-${ds}日`
}
module.exports={
  times:times,
  time:time,
  timeY:timeY,
  timeyear:timeyear,
  timeMonth:timeMonth,
  timeDay:timeDay
}