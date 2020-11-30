# 简单的纯 js 发布 npm 包

[![Build Status](https://travis-ci.org/simbawus/digital-keyboard.svg?branch=master)](https://travis-ci.org/simbawus/digital-keyboard)
[![Coverage Status](https://coveralls.io/repos/github/simbawus/digital-keyboard/badge.svg?branch=master)](https://coveralls.io/github/simbawus/digital-keyboard?branch=master)
[![npm](https://img.shields.io/npm/v/digital-keyboard.svg)](https://www.npmjs.com/package/digital-keyboard)
[![npm](https://img.shields.io/npm/dt/digital-keyboard.svg)](https://www.npmjs.com/package/digital-keyboard)
[![GitHub license](https://img.shields.io/github/license/simbawus/digital-keyboard.svg)](https://github.com/simbawus/digital-keyboard/blob/master/LICENSE)

-   demo

## 方法

-   `add(a,b)`: 简单的加法运算

## 开始上手

### 安装

#### yarn

```shell
yarn add wd-demo-js
```

#### npm

```shell
npm i wd-demo-js -S
```

### 使用示例

-   **import**

```js
import { add } from 'wd-demo-js';
let result = add(1, 2);
console.log('result', result);
```

-   **require**

```js
const add = require('wd-demo-js').add;
let result = add(1, 2);
console.log('result', result);
```

-   **原生 JavaScript**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
    </head>
    <body>
        <script src="index.js"></script>
        <script>
            var add = npmJSDemo.add;
            var result = add(1, 2);
            console.log('result', result);
        </script>
    </body>
</html>
```

## 如何贡献

欢迎每个人为这个项目做出贡献。可以从查看我们[未解决的问题](https://www.baidu.com)、[提交新问题](https://www.baidu.com)或[提出新功能](https://www.baidu.com)入手，参与讨论投票您喜欢或不喜欢的问题。

## 开源证书

[**The MIT License**](LICENSE).
