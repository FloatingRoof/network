import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import React from "react";
import AddNewPostForm from "./AddNewPostForm/AddNewPostForm";


const MyPosts = (props) => {
    let postElements = props.posts.slice().reverse().map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount}
                                                  dislikesCount={p.dislikesCount} />)
    /* Work with Ref
        let newPostElement = React.createRef();
        let text = newPostElement.current.value;
     */



    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm addPost={props.addPost}/>
            <div>
            </div>
            <div className={classes.posts}>
                {postElements}
            </div>
        </div>
    );
};


export default MyPosts;