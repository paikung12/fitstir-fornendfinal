export  default  {
    path : "ChallengePage",
    component : () => import('../views/ChallengePage/Template'),
    children : [
        {
            path : "index",
            name : "ChallengePage",
            component : () => import('../views/ChallengePage/index')
        },
    ]
}