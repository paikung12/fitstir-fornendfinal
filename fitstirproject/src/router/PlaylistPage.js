export  default  {
    path : "PlaylistPage",
    component : () => import('../views/playlistPage/Template'),
    children : [
        {
            path : "index",
            name : "PlaylistPage",
            component : () => import('../views/playlistPage/index')
        },
    ]
}