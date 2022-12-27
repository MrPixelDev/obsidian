#url #js #search #params #props

```
const getQueryByName = (name) => {

const query = new URLSearchParams(location.search)

return decodeURIComponent(query.get(name))

}

// url: https://medium.com/?name=fatfish&age=100

const name = getQueryByName('name') // fatfish

const age = getQueryByName('age') // 100

const gender = getQueryByName('gender') // null
```