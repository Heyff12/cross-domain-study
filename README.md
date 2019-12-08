# 安装  
```
npm install
## 打开请求设置  localhost:4000/index.html  
node appReq.js  
## 打开相应请求设置  localhost:4001 
node appRes.js
```



### 分析汇总  

方法 | 处理方| 原理| 解决的问题 | 是否涉及后端服务 | 协作方式 | 推荐等级 | 备注 | 引入firame
---|---|---|---|---|---|---|---|---
Access-Control-Allow-Origin | 被跨域方 | W3C的标准 | ajax请求 | 是 | | 一级 | CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法|
proxy | 跨域方 | 服务器之间没有跨域限制 | ajax请求 | 是 | | 一级 ||
nginx | 跨域方 | 服务器之间没有跨域限制 | ajax请求 | 是 | | 一级 ||
关闭浏览器跨域设置 | 跨域方 | 屏蔽了跨域限制 |  ajax请求/dom读取/cookie、localStorage等读取 | 否 | | 不推荐 | 不能改变实际场景，仅可用作测试 | 
webSocket | 双方协作 | HTML5新协议 | ajax请求 | 是  |被跨域方设置websocket服务器，监听事件并返回数据,跨域方引入websocket，监听事件、发送事件并处理数据 | 二级 | WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
jsonp | 双方协作 | 允许跨域资源嵌入（script不受同源策略影响） | ajax请求 | 是 | 约定好请求链接的callback参数名 | 三级 | 兼容性好，只适用get请求，只能用script有效；img、iframe等标签无法执行callback函数
window.postMessage | 双方协作 | HTML5 的新特性 | 用于页面之间跨域通信；localStorage、cookie等 | 否 | 跨域方和被跨域方，都需要监听message事件，并根据orgin判断返回相应数据；提前约定好哪些orgin允许返回data；跨域方需要通过iframe引入被跨域页面，并由该iframe发出postMessage事件| 三级 | window.postMessage(message,targetOrigin) 使用它来向其它的window对象发送消息；一个事件只能处理一种数据 | 是
window.name | 双方协作 | 同一个window生命周期内，所有页面共用同一个name | 页面之间传递数据，localStorage等 | 否 | 被跨域方设置window.name；跨域方通过iframe引入被跨域链接，并修改src为跨域方的同域链接，继而获取到window.name| 三级 | window.name默认值是''，最大可以达到2M，刷新后依然存在；只能使用一次；**中间iframe可以不做任何处理** | 是
location.hash | 双方协作 | 父子窗口可以彼此读写url | 页面之间传递数据 | 否 |被跨域方根据hash判断，通过iframe引入跨域方的b链接，并通过hash给该链接传值data；在b链接中，设置该链接的父窗口的父窗口的hash值为data；跨域方通过iframe引入被跨域链接，设置setInterval监听hash值的变化| 三级 | 更改hash不会导致页面刷新，**中间iframe需要更改父窗口的hash值**，只能使用一次 | 是
document.domain | 双方协作 | document.domain可以修改域 | 主域相同的二级域名页面之间传递数据，可以读取cookie | 否 | 双方都设置domain为主域；被跨域方设置data值；跨域方通过iframe引入被跨域链接，设置function，读取iframe中的data值| 三级 | | 是


方法 | 处理方| 原理| 解决的问题 | 是否涉及后端服务 | 推荐等级 | 引入firame
---|---|---|---|---|---|---
Access-Control-Allow-Origin | 被跨域方 | W3C的标准 | ajax请求 | 是 | 一级 | 
proxy | 跨域方 | 服务器之间没有跨域限制 | ajax请求 | 是 | 一级 |
nginx | 跨域方 | 服务器之间没有跨域限制 | ajax请求 | 是 | 一级 |
关闭浏览器跨域设置 | 跨域方 | 屏蔽了跨域限制 |  ajax请求/dom读取/cookie、localStorage等读取 | 否 | 不推荐 | 
webSocket | 双方协作 | HTML5新协议 | ajax请求 | 是  | 二级 | 
jsonp | 双方协作 | 允许跨域资源嵌入（script不受同源策略影响） | ajax请求 | 是 | 三级 | 
window.postMessage | 双方协作 | HTML5 的新特性 | 用于页面之间跨域通信；localStorage、cookie等 | 否 | 三级 | 是
window.name | 双方协作 | 同一个window生命周期内，所有页面共用同一个name | 页面之间传递数据，localStorage等 | 否 |  三级 | 是
location.hash | 双方协作 | 父子窗口可以彼此读写url | 页面之间传递数据 | 否 | 三级 | 是
document.domain | 双方协作 | document.domain可以修改域 | 主域相同的二级域名页面之间传递数据，可以读取cookie | 否 |  三级 | 是


#### 备注
form.submit 可以跨域发送post请求
