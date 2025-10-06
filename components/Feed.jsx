'use client'

import {useState, useEffect} from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className='mt-10 flex-wrap prompt_layout'>
    {data.map((post) => (
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
  const [ searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])


  const handleSearchChange = (e) =>{

    const text = (e.target.value).toLowerCase()
    setSearchText(text)

    if(text === '') {setPosts(allPosts)
      return
    }

    const filtered = allPosts.filter((post) => {
    const promptText = post.prompt?.toLowerCase() || "";
    const tagText = post.tag?.toLowerCase() || "";
    const usernameText = post.creator?.username?.toLowerCase() || "";

    return (
      promptText.includes(text) ||
      tagText.includes(text) ||
      usernameText.includes(text)
    );
  });

    setPosts(filtered)
  }
  const handleTagClick = (tag) => {
  setSearchText(tag);
  const filtered = posts.filter((post) =>
    post.tag.toLowerCase().includes(tag.toLowerCase())
  );
  setPosts(filtered);
};

  useEffect(() =>{
    const fetchPosts = async ()=>{
      const response =await fetch ('/api/prompt',)
      const data = await response.json()
      
      setAllPosts(data)
      setPosts(data)
    }
   
    fetchPosts();
  },[])



  return (
    <section className='feed  '>
    <form className='relative w-8/12 flex-center'>
    <input
      type="text"
      placeholder='search for a tag or a username'
      value={searchText}
      onChange={handleSearchChange}
      required
      className='search_input peer'
    />
    </form>

      <PromptCardList
      data = {posts}
      handleTagClick= {handleTagClick}
      />
    </section>
  )
}

export default Feed