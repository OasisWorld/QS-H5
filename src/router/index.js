import { createRouter,createWebHashHistory } from "vue-router";


const routes=[
    {
        path:"/login",
        name:"login",
        component:()=>import("@/page/login/login.vue"),
    },
    {
        path:"/test",
        name:"test",
        component:()=>import("@/page/test/test.vue"),
    },
    {
        path:"/",
        name:"index",
        component:()=>import("@/page/index/index2.vue"),

    }, 
    {
        path:"/money",
        name:"money",
        component:()=>import("@/page/money/money.vue"),

    },
    {
        path:"/activity",
        name:"activity",
        component:()=>import("@/page/activity/activity.vue"),

    },
    {
        path:"/user",
        name:"user",
        component:()=>import("@/page/user/user.vue"),
    },
    {
        path:"/money/pay",
        name:"pay",
        component:()=>import("@/page/money/pay.vue"),
    },
    {
        path:"/money/charge",
        name:"charge",
        component:()=>import("@/page/money/charge.vue"),
    },
    {
        path:"/money/payment",
        name:"payment",
        component:()=>import("@/page/money/payment.vue"),
    },
    {
        path:"/record/balance",
        name:"balance",
        component:()=>import("@/page/record/balance.vue"),
    },
    {
        path:"/record/gamelog",
        name:"gamelog",
        component:()=>import("@/page/record/gamelog.vue"),
    },
    {
        path:"/record/guess",
        name:"guess",
        component:()=>import("@/page/record/guess.vue"),
    },
    {
        path:"/record/integral",
        name:"integral",
        component:()=>import("@/page/record/integral.vue"),
    },
    {
        path:"/games/:id",
        name:"game",
        component:()=>import("@/page/game/game.vue"),
    },
    {
        path:"/trend/:id",
        name:"trend",
        component:()=>import("@/page/game/trend.vue"),
    },
    
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;