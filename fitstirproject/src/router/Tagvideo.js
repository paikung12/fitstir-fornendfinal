export  default  {
    path : "Tagvideo",
    component : () => import('../views/Tagvideo/Templelate'),
    children : [
        {
            path : "index",
            name : "Tagvideo",
            component : () => import('../views/Tagvideo/index')
        },
    ]
}