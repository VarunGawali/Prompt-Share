'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList= ({data, handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchtext, setsearchtext] = useState('')
  const [posts, setposts] = useState([])
  const handlesearchchange = (e)=>{}

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setposts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full 
      flex-center'>
        <input type="text"
        placeholder='Search for a tag or username'
        value={searchtext}
        onChange={handlesearchchange}
        required
        className='search_input peer' />
      </form>

      <PromptCardList
      data={posts}
      handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed
