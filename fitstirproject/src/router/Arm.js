export  default  {
    path : "Arm",
    component : () => import('../views/Tagvideo/Arm/Templeate'),
    children : [
        {
            path : "index",
            name : "Arm",
            component : () => import('../views/Tagvideo/Arm/index')
        },
    ]
}