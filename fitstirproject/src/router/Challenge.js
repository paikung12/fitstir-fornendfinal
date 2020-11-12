export  default  {
    path : "challenge",
    component : () => import('../views/Challenge/Template'),
    children : [
        {
            path : "index",
            name : "challengeIndex",
            component : () => import('../views/Challenge/index')
        },
    ]
}