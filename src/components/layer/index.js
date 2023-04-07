import popupCpm from './popupcpm.vue';
export default {
    install(Vue, options) {
        let $ele, $eles = [];
        const Mask = (config) => {
            let Action = Vue.extend(popupCpm);
            const div = document.createElement("div");
            document.body.appendChild(div);
            $ele = new Action({
                propsData: {
                    ...config,
                },
            }).$mount(div);
            $eles.push($ele);
        }
        // 多个弹窗依次销毁
        const _destory = () => {
            $ele.popupShow = false;
            $ele.onClose();
            $ele = null;
            if ($eles.length > 1) {
                $ele = $eles[$eles.length - 2];
                $eles = $eles.splice($eles.length - 1, 1);
            }
        }
        // 销毁全部的弹窗
        const destoryAll = () => {
            $eles.forEach(v => {
                v.popupShow = false;
                v.onClose();
            })
            $eles = [];
            $ele = null;
        }
        Vue.prototype.vshow = (opts) => {
            if(!opts){return};
            switch (typeof opts) {
                case 'string':
                    console.log('Oops... is String');
                    break;
                case 'object':
                    Mask(opts);
                    // for (let key in opts) {
                    //     if (typeof opts[key] === 'function') {
                    //         $ele[key] = (v) => {
                    //             if (opts.isOwnDestory) { opts[key](v, _destory) }
                    //             else { opts[key](v); _destory() };
                    //         }
                    //     }
                    // }
                    break;
            }
            return $ele.vshow().then(_rsp => {
                console.log("正常返回的值=>",_rsp);
                if (opts.isOwnDestory) {
                    opts.onSuccess(_rsp, $ele.onClose);
                    return;
                }
                opts.onSuccess?opts.onSuccess(_resp):'';
                $ele.onClose();
                $ele = null;
            }).catch(_err => {
                console.log("点击取消的值=>",_err);
                opts.onCancel?opts.onCancel(_err):'';
                $ele.onClose();
                $ele = null;
            })
        }
        // 全局销毁弹窗事件
        Vue.prototype.vshowDestory = () => {
            destoryAll();  //销毁所有的弹窗
        }
    }
}
