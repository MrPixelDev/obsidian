#JS #Fullscreen

```
// Enter full screen

function fullScreen() {

let el = document.documentElement

let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen

//typeof rfs != "undefined" && rfs

if (rfs) {

rfs.call(el)

} else if (typeof window.ActiveXObject !== "undefined") {

let wscript = new ActiveXObject("WScript.Shell")

if (wscript != null) {

wscript.SendKeys("{F11}")

}

}

}

// Exit full screen

function exitScreen() {

let el = document

let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen

//typeof cfs != "undefined" && cfs

if (cfs) {

cfs.call(el)

} else if (typeof window.ActiveXObject !== "undefined") {

let wscript = new ActiveXObject("WScript.Shell")

if (wscript != null) {

wscript.SendKeys("{F11}")

}

}

}
```