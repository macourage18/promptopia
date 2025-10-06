import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, desc, handleDelete, handleEdit,data =[]}) => {
  
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
      <span className='blue_gradient'> {name} Profile </span>
      </h1>
      <p className='desc text-left'>{desc}</p>
          <div className='mt-11 prompt_layout'>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() => handleDelete && handleDelete(post)}
                />
              ))
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
                  
          </div>
    </section>
  )
}

export default Profile