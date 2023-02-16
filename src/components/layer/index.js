import popupCpm from './popupcpm.vue';
let layPopup = {};
layPopup.install = function (Vue, options) {
    let Action = Vue.extend(popupCpm);
    const div = document.createElement("div");
    document.body.appendChild(div);
    let $ele;
    const Mask = (config) => {
        $ele = new Action({
            propsData:{
                ...config,
            },
    
        }).$mount(div)
    }

    const _destory = ()=>{
        $ele.popupShow = false;
        $ele.onClose();
        $ele = null
    }
    Vue.prototype.vshow = (opts) => {
        if ($ele) return;
        switch(typeof opts){
            case 'string':
                console.log('Oops... is String');
                break;
            case 'object':
                Mask(opts);
                for(let key in opts){
                    if(typeof opts[key] === 'function'){
                        $ele[key] = (v)=>{
                            if(opts.isOwnDestory){opts[key](v,_destory)}
                            else {opts[key](v);_destory()};
                        }
                    }
                }
                break;
        }
        return $ele.vshow().then(_rsp=>{
            $ele = null;
        }).catch(_err=>{
            $ele = null;
        })
    }
    // 全局销毁弹窗事件
    Vue.prototype.vshowDestory = ()=>{
        _destory();
    }
}

export default layPopup;
