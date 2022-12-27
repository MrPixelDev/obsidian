#JS #smooth #scrollTop

```
const scrollToTop = () => {

const c = document.documentElement.scrollTop || document.body.scrollTop

if (c > 0) {

window.requestAnimationFrame(scrollToTop)

window.scrollTo(0, c - c / 8)

}

}
```

# Get the Scroll distance

#scrollDistance

```
const getScrollPosition = (el = window) => ({

x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,

y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,

})

getScrollPosition() // { x: 0, y: 215 }
```