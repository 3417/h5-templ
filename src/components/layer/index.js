import popupCpm from './popupcpm.vue';
let layPopup = {};
layPopup.install = function (Vue, options) {
    let cpm = Vue.extend(popupCpm);
    let $instance;
    const Mask = () => {
        $instance = new cpm();
        let ele = $instance.$mount().$el;
        document.body.appendChild(ele);
    }
    const _destory = () =>{
        $instance.popupShow = false;
        $instance.destroy();
        $instance = null;
    }
    Vue.prototype.vshow = (options) => {
        if (!$instance) Mask();
        if (typeof options === 'string') {
            // 传入为字符串的逻辑-可自定义优化
            console.log("弹窗字符串的逻辑");
        } else if (typeof options === 'object') {
            Object.assign($instance, options);
            for (let i in options) {
                if(typeof options[i] === 'function'){
                    $instance[i] = function(v){
                        if(options.isOwnDestory){
                            options[i](v,_destory); //将组件销毁的时机交给用户
                        }else{
                            options[i](v);
                            _destory()
                        }
                    }
                }
            }
        }
        // return $instance.vshow().then(_rsp=>{
        //     $instance = null;
        // }).catch(_err=>{
        //     $instance = null;
        // })
    }
}

export default layPopup;
