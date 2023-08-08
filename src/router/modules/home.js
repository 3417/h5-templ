export default [
    {
        path:"/goods",
        name:"goods",
        component:()=>import("@/views/df-goods/goods.vue")
    },
    {
        path:"/detail",
        name:"detail",
        component:()=>import("@/views/df-goods/detail.vue"),
    },
    {
        path:"/rules",
        name:"rules",
        component:()=>import("@/views/Rules.vue"),
    }
]