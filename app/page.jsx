import Feed from "@components/Feed"

const Home = () => {
  return (
    <section  className="w-full flex-center flex-col">
      <h1 className="text-center text-4xl font-bold text-black">Discover & Share <br className="max-md:hidden"/>
        <span className="orange_gradient text-center text-orange">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  )
}

export default Home