const url = 'http://localhost:8000'

const pathConfig = {
    RoomApi : {
        list: url+'/api/rooms/',
        detail: url+'/api/rooms/',
        create: url+'/api/rooms/createRoom',
        edit: url+'/api/rooms/editRoom',
    },
    UserApi : {
        register: url+'/api/user/register',
        login: url+'/api/user/login',
        logout: url+'/api/user/logout',
        isLogin: url+'/api/user/isLogin',
        user: url+'/api/user/user',
    }
}

export default pathConfig;