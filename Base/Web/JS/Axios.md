#axios #usecases

```
import axios from 'axios';

const api = axios.create({
	widthCredentials: true, //Connect cookies on every //req automatically
	baseURL: %url%;
	
})
```

#interceptor #axios #localstorage
```
api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});
```

Axios always returns object, data stored in "Data" field
To ensure type of this data u need to import {AxiosResponse} and use it as generic

If we use generic with our interface, the response from axios is not "black box", it has fields of that interface
![[Pasted image 20230206073551.png]]


```
```