const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType={
    id:number
    name: string
    photo: string
}


let initialState = {
    messages: [
        {id: 1, message: 'Hi', messageMy: false},
        {id: 2, message: 'How are you?', messageMy: true},
        {id: 3, message: 'WTF man', messageMy: true},
        {id: 4, message: 'Go the shop', messageMy: false},
        {id: 5, message: 'Yo', messageMy: false}
    ],
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
    ] as Array<DialogType>
}

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: SendMessageCreatorType):InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: 6,
                        message: action.newMessageBody,
                        messageMy: true
                    }
                ],

            };
            // stateCopy.newMessageBody = '';
            //stateCopy.messages.push(newMessage);
        }
        default:
            return state;
    }
}


type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType =>
    ({type: SEND_MESSAGE, newMessageBody});


export default dialogsReducer;
