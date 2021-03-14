## handleMock
An express middleWare function to control request forward,if the request match the config, it will return the mock data,otherwise the reauet will forward to the target host

#### handleMock(config:config[], defaultHost: string):void

usage:
```js
const config = [
    {
      url: '/search_api/v1/search',
      params: {
      name: 'yyyy',
    },
    mockData: { m: 'mmm' },
    target: 'https://api.juejin.cn',
    },
]

app.use(handleMock(config, 'https://api.juejin.cn'));
```