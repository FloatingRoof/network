import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";


let state = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 12, dislikesCount: 3},
        {id: 2, post: 'Hello my friend!', likesCount: 4, dislikesCount: 10},
    ]
}
test('length of posts  should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("test")


    // 2. action
    let newState = profileReducer(state,action);

    // 3. expectation
    expect(newState.posts.length).toBe(3) ;

});


test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator("test")


    // 2. action
    let newState = profileReducer(state,action);

    // 3. expectation
    expect(newState.posts[2].post).toBe("test") ;
});



test('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)


    // 2. action
    let newState = profileReducer(state,action);

    // 3. expectation
    expect(newState.posts.length).toBe(1) ;
});

test('after deleting length shouldn`t be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(10)


    // 2. action
    let newState = profileReducer(state,action);

    // 3. expectation
    expect(newState.posts.length).toBe(2) ;
});



