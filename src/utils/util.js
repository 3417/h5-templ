// 递归查询树状结构的数据并且保留层级
export const recursion = (nodes, predicate, fn = () => false) => {
    if (!(nodes && nodes.length)) {
        return []
    }
    const newChildren = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (fn(node) && predicate(node)) {
            newChildren.push(node);
            continue;
        }
        const subs = recursion(node.children, predicate, fn);
        if ((subs && subs.length) || predicate(node)) {
            node.children = subs || [];
            newChildren.push(node);
        }
    }
    return newChildren.length ? newChildren : []
}
// const newTree = recursion(JSON.parse(JSON.stringify(data)),
//     (node) => {
//         if (node.id && node.id == '5') {
//             return true
//         }
//         return false;
//     }

// )


// 图片文件转base64实现预览
export const picToPreview=(e)=>{
    if(e.target.files.length){
        const fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = ()=>{
            return fr.result;
        }
    }
    return false;
}

// 递归深拷贝->copyDeep(<{obj}>,<newobj>)
export const copyDeep = (obj,newobj)=>{
    for(let key in obj){
        if(obj[key] instanceof Array){
            obj[key] = []
            copyDeep(obj[key],newobj[key])
        }else if(obj[key] instanceof Object){
            obj[key] = {};
            copyDeep(obj[key],newobj[key])
        }else{
            newobj[key] = obj[key]
        }
    }
}

// 获取手机电池信息
export const getBattery = ()=>{
    const batteryStatus = navigator.getBattery().then((battery)=>{
        console.log(battery);
        battery.addEventListener('levelchange',()=>{});
        battery.addEventListener('chargingchange',()=>{});
    })
    
}