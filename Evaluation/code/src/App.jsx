import { useContext } from 'react'
import './App.css'
import { PostContext, PostProvider } from './PostContext'
import { ThemeContext, ThemeProvider } from './ThemeContext';
import PostItem from './PostItem';
const AppContent=()=>{
    const{posts}=useContext(PostContext);
    const{theme,toggleTheme}=useContext(ThemeContext);
    return(
        <div className={`app ${theme}`}>
            <header>
                <h1>Post Manager</h1>
                <button onClick={toggleTheme}>Switch Theme</button>
            </header>
            <div className='post-grid'>
                {posts.map(post=>(
                    <PostItem key={post.id} post={post}/>
                ))}
            </div>
            </div>
    )
}
export default function App(){
    return(
        <ThemeProvider>
            <PostProvider>
                <AppContent />
            </PostProvider>
        </ThemeProvider>
    )
}