import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {

    //свойство через :
    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hi, how are you?', likesCount: 12, dislikesCount: 3}, {
                    id: 2,
                    post: 'Hello my friend!',
                    likesCount: 4,
                    dislikesCount: 10
                },
            ],
            newPostText: 'IT'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi', messageMy: false},
                {id: 2, message: 'How are you?', messageMy: true},
                {id: 3, message: 'WTF man', messageMy: true},
                {id: 4, message: 'Go the shop', messageMy: false},
                {id: 5, message: 'Yo', messageMy: false}
            ],
            newMessageBody: 'dsd',
            dialogs: [
                {
                    id: 1,
                    name: 'Dimych',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 2, name: 'Andrew',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 3, name: 'Sveta',
                    photo: 'https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg?size=338&ext=jpg&ga=GA1.2.1141335507.1634515200'
                },
                {
                    id: 4,
                    name: 'Sasha',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 5,
                    name: 'Victor',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 6,
                    name: 'Valera',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                }
            ]
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'Max',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 2,
                    name: 'Ivan',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                },
                {
                    id: 3,
                    name: 'Dimych',
                    photo: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                }
            ]
        }
    },
    //метод, который будет принимать функцию
    _callSubscriber() {
        console.log('State changed');
    },


    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; //наблюдатель - паттерн
    },


    //метод, который будет делать все действия (добавлять пост, сообщение итд
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }

}


export default store;