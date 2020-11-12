export  default  {
    path : "CreateChallenge",
    component : () => import('../views/CreateChallenge/Template'),
    children : [
        {
            path : "index",
            name : "CreateChallenge",
            component : () => import('../views/CreateChallenge/index')
        },
    ]
}