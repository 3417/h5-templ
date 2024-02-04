  /**
   * 1.使用方法
   * this.vshow(Object)
   * 传入的需要页面展示的数据放在rData对象中，componenTag为传入的组件
   * 2.接受参数
   * 接受参数：Object
   * Object:
   *    1.componenTag:传入自定义的组件
   *    2.maskBgColor:蒙层背景色（已默认可不传）
   *    3.rData:相关数据信息
   *    4.isSucDestory/isCanDestory:是否需要手动销毁弹窗
   *      4.1<默认为false,如为true则onSuccess，onCancel回调函数中会回传一个callback函数，需要手动调用销毁>
   *       4.2<eg:onSuccess:(val,cb)=>{cb && cb()}>
   *    5.onSuccess:成功回调
   *    6.onCancel:关闭回调 
   * 调用事例:
   * this.vshow({
   *    componenTag:<components>,
   *    isSucDestory:false //判断确定是否要手动销毁,默认为false
   *    isCanDestory:false //判断取消是否要手动销毁,默认为false
   *    rData:<object>,
   *    onSuccess:<fn(参数)>,
   *    onCancel:<fn(参数)>
   * })
   * 
   * tip:
   * 1.自定义组件按照vue的$emit方法调用,基础组件支持onSuccess，onCancel方法,
   * 即自定义组件需要使用方法时可以$emit('onSuccess')或者$emit('onCancel'); 
   * 2.可根据不用的业务需求传入自定义的参数判断执行不用的逻辑
   * 如果需要在弹窗中再次调用弹窗请使用setTimeout方式异步调用
   * 3.$emit返回的参数如有多个的话尽量使用对象的方式返回
   * 
   * 
   * 如需要在弹窗中再次调用弹窗请使用setTimeout异步方法调用
   * */
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
            $ele.onClose();
            $ele = null;
            if ($eles.length > 1) {
                $ele = $eles[$eles.length - 2];
                $eles.splice($eles.length - 1, 1);
            }else if($eles.length == 1){
                $eles = [];
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
                    throw new Error('传入参数错误，请传入对象');
                    break;
                case 'object':
                    Mask(opts);
                    break;
            }
            // 重写 定义在组件中的onSuccess,onCancel方法
            $ele.onSuccess = (_v)=>{
                console.warn('onSuccess=>',_v);
                if(opts.isSucDestory){
                    opts.onSuccess(_v,_destory);
                    return;
                }
                (opts.onSuccess) ? opts.onSuccess() : '';
                _destory();
            }
            $ele.onCancel = (_v)=>{
                console.warn('onCancel=>',_v);
                if(opts.isCanDestory){
                    opts.onCancel(_v,_destory);
                    return;
                }
                (opts.onCancel) ? opts.onCancel() : '';
                _destory();
            }

            return $ele.vshow();
        }
        // 全局销毁弹窗事件
        Vue.prototype.vshowDestory = () => {
            destoryAll();  //销毁所有的弹窗
        }
    }
}
