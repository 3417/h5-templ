// 获取日期数据
import dayjs from "dayjs";
export const oData = () => {
    let startYear = 2023, startMonth = 6; // 开始时间配置
    let curYear = dayjs().year(), curMonth = dayjs().month() + 1;
    if (curYear > startYear) {
        let day1 = dayjs(`${startYear}${(startMonth-1)}`), day2 = dayjs(dayjs().format('YYYYMM')); //月份默认是从0开始的
        let monthLen = day1.diff(day2, 'month', true);  //获取两个时间段总共相差的月数
        let preYearMonth = Math.abs(monthLen) - 1, dateList = [];
        for (let i = preYearMonth + 1; i >= 1; i--) {
            dateList.push(dayjs().month(curMonth).subtract(i,'month').format('YYYYMM'));
        }
        let dateListAll = dateList;
        console.log('获取下一年的年份月份', dateListAll);
        return dateListAll;
    } else {
        let monthLen = curMonth - startMonth, dateList = [];
        for (let i = 0; i <= monthLen; i++) {
            dateList.push(dayjs().add(-i, 'month').startOf('month').format('YYYYMM'));
        }
        console.log('获取今年的年份月份', dateList);
        return dateList;
    }
}

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