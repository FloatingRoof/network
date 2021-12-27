import classes from './Post.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Post = (props) =>{
    return(
            <div>
                <img/>
                {props.message} 
                <div>
                    <span> <FontAwesomeIcon icon={"heart"} /> {props.likesCount} Like     </span>
                    <span> <FontAwesomeIcon icon={"heart-broken"}/> {props.dislikesCount} Dislike</span>
                 </div>
            </div>
    );
};

export default Post;