const axios = require('axios');
function matchParams(params, config) {
  let flag = true;
  Object.getOwnPropertyNames(config).forEach((key) => {
    if (params[key] !== config[key]) {
      flag = false;
    }
  });
  return flag;
}

function handleMock (mock, defaultHost) {
  return (req, res, next) => {
    // 获取 post参数
    const mockConfig = mock;
    const methodFlag = req.method.toUpperCase() === 'POST' ? 'POST' : 'GET';
    let matchFlag = false;
    mockConfig.forEach((val, index) => {
      // check url
      if (val.url === req.url) {
        if (methodFlag === 'POST') {
          // post要匹配参数
          const bodyParams = req.body;
          const getFlag = matchParams(bodyParams, val.params);
          if (getFlag) {
            res.json(val.mockData);
            matchFlag = true;
          }
        } else {
          // get的情况
          res.json(val.mockData);
          matchFlag = true;
        }
      }
      if (!matchFlag) {
        // 转发
        const host = val.target ? val.target : defaultHost;
        const url = host + req.url;
        axios({
          method: methodFlag,
          url,
          data: req.body,
        }).then((response) => {
          if (response.data) {
            res.json(response.data);
          } else {
            res.json({ error: '-1' });
          }
        }).catch(() => {
          res.json({ error: '-1' });
        });
      }
    });
  }
}

module.exports = handleMock;