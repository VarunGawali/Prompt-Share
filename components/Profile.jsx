import PromptCard from "./PromptCard"

const Profile = ({name, desc, data, handledelete, handleedit}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <div className='mt-10 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleedit={()=> handleedit && handleedit(post)}
        handledelete={()=> handledelete && handledelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile
