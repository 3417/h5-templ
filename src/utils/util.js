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