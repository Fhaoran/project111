// 注意：每次调用$.get()或$.post()或$.Ajax()的时候
// 会先调用AjaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 统一为有权限的接口，设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
        options.complete = function(res) {
            // console.log(res);
            // console.log('执行了complete回调：');
            // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.当用户为非法用户时，强制清空token
                localStorage.removeItem('token');
                // 2.强制跳转到登录页面
                location.href = 'login.html';
            }
        };
    }
});