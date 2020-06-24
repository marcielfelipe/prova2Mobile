import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';



export default function Home(){
    const [posts,setPosts]=useState([]);
    const [comments,setComments]=useState([]);
   // const [postId,setPostId]=useState('');
    const [details,setDetails]=useState(false);


    async function loadPosts(){
        const response = await api.get('posts');
        setPosts(response.data);
    }
    async function loadComments(){
        const response = await api.get('comments?postId='+localStorage.id)
        setComments(response.data);
        
    }

    async function getComments(id){
        localStorage.removeItem('id');
        setDetails(!details);
        localStorage.setItem('id',id);
        loadComments();
    }

    useEffect(()=>{
        loadPosts();
    },[]);

    return(
        <div>
            <header>
                <h1>Prova 2º bimestre Desenvonvimento e IoT</h1>  
            </header>
            
            <div className="container">
                <div className="posts-container">
                    <ul className="posts">
                        {
                            
                            posts.map(post=>(

                                <li key={post.id} onClick={()=>getComments(post.id)}>
                                    <div>
                                        <h2 className="title">
                                            {post.title}
                                        </h2>
                                        <p className="body">
                                            {post.body} 
                                        </p>
                                    </div>
                                </li>     
                            ))
                        }
                    </ul>
                </div>
                <div className="comments-container">
                    {
                        !details && <div></div>
                    }{
                        details &&
                        <ul className="posts">
                            {
                                comments.map(comment=>(
                                    <li key={comment.id}>
                                        <div className="text">
                                            <strong>
                                                {comment.name}
                                            </strong>
                                            <p>
                                                {comment.email} 
                                            </p>
                                            <p>
                                                {comment.body} 
                                            </p>
                                        </div>
                                       
                                    </li>     
                                ))
                            }
                        </ul>    
                    }
                </div>
                

            </div>
        </div>
    );
}