import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const topicsData = {
  MongoDB: [
    { id: 1, title: 'Introduction to MongoDB', difficulty: 'beginner', description: 'Learn the basics of MongoDB, a NoSQL database.' },
    { id: 2, title: 'CRUD Operations', difficulty: 'beginner', description: 'Create, Read, Update and Delete documents in MongoDB.' },
    { id: 3, title: 'Mongoose Schema', difficulty: 'intermediate', description: 'Define data models using Mongoose ODM.' },
    { id: 4, title: 'Aggregation Pipeline', difficulty: 'advanced', description: 'Process data records and return computed results.' },
  ],
  Express: [
    { id: 5, title: 'Express Setup', difficulty: 'beginner', description: 'Setup a basic Express.js server from scratch.' },
    { id: 6, title: 'Middleware', difficulty: 'intermediate', description: 'Understand how middleware works in Express.' },
    { id: 7, title: 'Error Handling', difficulty: 'intermediate', description: 'Handle errors gracefully in your Express app.' },
    { id: 8, title: 'REST API Design', difficulty: 'advanced', description: 'Design clean and scalable REST APIs.' },
  ],
  React: [
    { id: 9,  title: 'React Basics', difficulty: 'beginner', description: 'Learn components, props and JSX in React.' },
    { id: 10, title: 'useState & useEffect', difficulty: 'beginner', description: 'Master the two most used React hooks.' },
    { id: 11, title: 'React Router', difficulty: 'intermediate', description: 'Add navigation and routing to your React app.' },
    { id: 12, title: 'Redux Toolkit', difficulty: 'advanced', description: 'Manage global state with Redux Toolkit.' },
  ],
  Node: [
    { id: 13, title: 'Node.js Basics', difficulty: 'beginner', description: 'Understand how Node.js works under the hood.' },
    { id: 14, title: 'File System Module', difficulty: 'intermediate', description: 'Read and write files using the fs module.' },
    { id: 15, title: 'Event Loop', difficulty: 'intermediate', description: 'Deep dive into the Node.js event loop.' },
    { id: 16, title: 'Streams & Buffers', difficulty: 'advanced', description: 'Handle streaming data efficiently in Node.js.' },
  ],
}

const difficultyColor = {
  beginner: 'bg-green-500/10 text-green-400 border border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-400 border border-red-500/20',
}
const difficultyLevel = ['all', 'beginner', 'intermediate', 'advanced'];
const categoryInfo = {
  MongoDB: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20',fill: 'bg-green-500', emoji: '🍃' },
  Express: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', fill: 'bg-yellow-500', emoji: '⚙️'  },
  React:   { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20', fill: 'bg-blue-500',  emoji: '⚛️' },
  Node:    { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', fill: 'bg-emarald-500', emoji: '🟢'  },
}

const statsData = [
    { label: 'Questions Solved', value: 24,   icon: '❓' },
    { label: 'Topics Completed', value: 6,    icon: '✅' },
    { label: 'Bookmarks Saved',  value: 3,    icon: '🔖' },
    { label: 'Quiz Score',       value: '82%', icon: '🏆' },
]
const completedData = {
  MongoDB: 1,
  Express: 2,
  React:   3,
  Node:    0,
}
const Dashboard = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('MongoDB')
  const [search, setSearch] = useState('')
    const [activeNav, setActiveNav] = useState('Dashboard')
  const categories = ['React', 'Node', 'Express', 'MongoDB']

  const navLinks = ['Dashboard', 'Topics', 'Questions', 'Bookmarks', 'Profile']

  const filteredTopics = topicsData[activeCategory].filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  )
//   console.log(window.innerWidth, window.innerHeight)
  // featured topic = first topic of active category
  //const featuredTopic = topicsData[activeCategory][0]

  return (
     <div className="min-h-screen bg-gray-950 flex flex-col">
        {/* ======= TOP NAVBAR ======= */}
      <header className="bg-gray-900 border-b border-gray-900 sticky top-0 z-20">
        {/* Main navbar row */}
        <div className="px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-lg font-bold text-white">⚡ MERN Prep Kit</h1>
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                <button
                    key={link}
                    onClick={() => setActiveNav(link)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200
                    ${activeNav === link
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                    `}
                >
                    {link}
                </button>
                ))}
            </nav>
            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 w-48"
                />
                {/* Streak */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-1.5 text-sm text-orange-400 font-medium">
                🔥 5
                </div>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                A
                </div>
            </div>
        </div>
        {/**Category tabs row */}
        <div className="px-6 pb-0 flex items-center gap-1 border-t border-gray-800">
            {categories.map(category =>(
                <button
                key={category}
                onClick={()=>{
                    setActiveCategory(category);
                    setSearch('');
                }}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition duration 200
                    ${activeCategory === category 
                        ?`${categoryInfo[category].text} border-current`
                    :'text-gray-500 border-transparent hover:text-gray-300'}
                    `}
                >
                    {categoryInfo[category].emoji}{category}
                </button>
            ))}
        </div>
    
      </header>
      {/** =========== Page Body =========== */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
            {/** Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/10 border-blue-500/20 rounded-2xl p-6 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        ready to practice today? 💪
                    </h2>
                    <p className="text-gray-400 text-sm">
                        You are on a <span className='
                        text-orange-400 font-semibold'>5 day streak</span>
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-gray-500 text-xs mb-1">Overall Progress</p>
                    <p className="text-3xl font-bold text-blue-400">37%</p>
                    <p className="text-gray-600 text-xs">6 of 16 done</p>
                </div>
                
            </div>
            {/* Category Progress Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {categories.map(category => {
                    const total = topicsData[category].length;
                    const completed = completedData[category]
                    const percent = Math.round((completed/total)*100);
                    return(
                        <div
                        key={category}
                        onClick={()=> setActiveCategory(category)}
                         className={`${categoryInfo[category].bg} border ${categoryInfo[category].border} rounded-xl p-4 cursor-pointer hover:scale-105 transition duration-200
                  ${activeCategory === category ? 'ring-2 ring-offset-2 ring-offset-gray-950 ring-blue-500' : ''}
                `}
                        >
                            {/**Top row */}
                            <div className="flex items-center justify-between mb-3">
                                <span className='text-lg'>{categoryInfo[category].emoji}</span>
                                <span className={`text-xs font-semibold ${categoryInfo[category].text}`}>
                                    {percent}%
                                </span>
                            </div>
                            {/**Name */}
                            <h3 className={`font-bold text-sm mb-0.5 ${categoryInfo[category].text}`}>
                                {category}
                            </h3>
                            <p className = "text-gray-400 text-xs mb-3">
                                {completed}/{total} topics done

                            </p>
                            {/**Progress bar */}
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                                <div className={`${categoryInfo[category].fill} h-1.5 rounded-full transition-all duration-700`}
                                    style={{width:`${percent}%`}}
                                >
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/** Stats row */}
            <div className = "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statsData.map(stat =>(
                    <div
                        key={stat.label}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:scale-105 hover:border-gray-600 transition duration-200"
                    >
                        <div className="text-lg mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
                    </div>

                ))}
            </div>

            {/** Active category heading */}
            <div className = "flex items-center justify-between mb-4">
                <div>
                    <h2 className={`text-xl font-bold ${categoryInfo[activeCategory].text}`}>
                        {categoryInfo[activeCategory].emoji} {activeCategory} Topics
                    </h2>
                    <p className="text-gray-600 text-xs mt-0.5">
                        {filteredTopics.length} topics
                        {search && ` found for "${search}"`}
                    </p>
                </div>
                {/**difficulty filter */}
                <div className =  "flex gap-2">
                    {difficultyLevel.map(level =>(
                        <button
                        key={level}
                        className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:scale-110 transition capitalize"

                        >
                            {level}
                        </button>
                    ))}
                </div>

            </div>
            {/** Topics Grid */}
            {filteredTopics.length === 0 ?(

                <div className="text-center py-16">
                    <p className="Text-4xl mb-3">🔍</p>
                    <p className="text-gray-500">No topics found for {search}</p>
                    <button
                        onClick={()=>setSearch("")}
                        className="mt-3 text-blue-400 text-sm hover:underline"
                    >
                        Clear search

                    </button>
                </div>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTopics.map(topic =>(

                        <div
                            key={topic.id}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition duration-200 cursor-pointer group"
                        >
                            {/**Top row */}
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-white font-semibold text-sm group-hover:text-blue-400 transition leading-snug">
                                    {topic.title}
                                </h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${difficultyColor[topic.difficulty]}`}>
                                    {topic.difficulty}
                                </span>
                                
                            </div>
                            <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                                    {topic.description}
                            </p>
                            {/**Footer */}
                            <div className="flex items-center justify-between">
                                <button className="text-blue-400 text-xs hover:underline">
                                    Read more →
                                </button>
                                <button className="text-gray-600 hover:text-yellow-400 transition text-sm">
                                    🔖
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
        {/**Footer */}
        <footer className="border-t border-gray-800 py-4 text-center">
            <p className="text-gray-500 text-s">
                MERN Preparation Kit - Built with love(❤️) for developers
            </p>
            <p className="text-center text-gray-500 text-sm mt-6">
            Wants to logout?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Logout
            </Link>
          </p>
        </footer>
      
     </div>
  )
}

export default Dashboard