export  default  {
    path : "UserProfile",
    component : () => import('../views/UserProfile/Templelate'),
    children : [
        {
            path : "index",
            name : "UserProfileIndex",
            component : () => import('../views/UserProfile/index')
        },
    ]
}