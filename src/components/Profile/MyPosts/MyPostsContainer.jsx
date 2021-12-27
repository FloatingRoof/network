import React from "react";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


// const MyPostsContainer = (props) => {
//
//
//     return (
//         <StoreContex.Consumer>
//             { (store) => {
//
//                 let state = store.getState();
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator());
//                 }
//
//                 let onPostChange = (text) => {
//                     store.dispatch(updateNewPostTextActionCreator(text));
//                 }
//                 return  <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
//                          newPostText={state.profilePage.newPostText}/>
//             }
//             }
//         </StoreContex.Consumer>
//
//
//     );
// };


let mapStateToProps = (state) =>{
    return{
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        addPost: (newPostText) =>{
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;