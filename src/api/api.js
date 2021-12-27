import axios from "axios";


const instance = axios.create({
    //куки
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
    "API-KEY" : "8ada7eb3-a23e-4125-a9f0-df192c1f50b0"
}
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId){
        return instance.post(`follow/${userId}`, {}).then(response => response.data)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    getProfile(userId){
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId);
    },

}

export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return instance.put(`/profile/status`, {status: status});
    }
}

export const authAPI = {
    authMe(){
        return instance.get('auth/me/').then(response => response.data);
    },
    login(email,password,rememberMe = false){
        return instance.post('auth/login',{email,password,rememberMe});
    },
    logout(email,password,rememberMe = false){
        return instance.delete('auth/login').then(response => response.data);
    }
}



