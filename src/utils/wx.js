/**
 * 防止用户使用微信把字体放大导致页面变形
 * */ 
(function () {
    let WeixinJSBridge = window.WeixinJSBridge;
    if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
        onResetFontSize()
    } else { document.addEventListener('WeixinJSBridgeReady', onResetFontSize, false) }
    function onResetFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
        })
    }
})()