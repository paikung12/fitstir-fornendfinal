export  default  {
    path : "Addvideo",
    component : () => import('../views/AddVideoPlaylist/Templelate'),
    children : [
        {
            path : "index",
            name : "Addvideo",
            component : () => import('../views/AddVideoPlaylist/index')
        },
    ]
}