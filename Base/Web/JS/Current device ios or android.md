```
function getOSType() {

let u = navigator.userAgent,

app = navigator.appVersion

let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1

let isIOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/)

if (isIOS) {

return 0

} else if (isAndroid) {

return 1

} else {

return 2

}

}

getOSType() // 0
```