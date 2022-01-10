import axios from "axios";


const instance = axios.create({
    //куки
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": `${process.env.REACT_APP_API_KEY}`
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {}).then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId);
    },

}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile){
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    authMe() {
        return instance.get('auth/me/').then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha = "") {
        return instance.post('auth/login', {email, password, rememberMe,captcha});
    },
    logout(email, password, rememberMe = false) {
        return instance.delete('auth/login').then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url').then(response => response.data);
    }
}



