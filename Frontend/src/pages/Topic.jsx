import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// dummy data (will come from backend later)
const topicsData = [
  { id: 1,  title: 'Introduction to MongoDB',  category: 'MongoDB', difficulty: 'beginner',     description: 'Learn the basics of MongoDB, a NoSQL database.',          readTime: '5 min',  completed: false },
  { id: 2,  title: 'CRUD Operations',           category: 'MongoDB', difficulty: 'beginner',     description: 'Create, Read, Update and Delete documents in MongoDB.',   readTime: '8 min',  completed: false },
  { id: 3,  title: 'Mongoose Schema',           category: 'MongoDB', difficulty: 'intermediate', description: 'Define data models using Mongoose ODM.',                  readTime: '10 min', completed: true  },
  { id: 4,  title: 'Aggregation Pipeline',      category: 'MongoDB', difficulty: 'advanced',     description: 'Process data records and return computed results.',        readTime: '15 min', completed: false },
  { id: 5,  title: 'Express Setup',             category: 'Express', difficulty: 'beginner',     description: 'Setup a basic Express.js server from scratch.',           readTime: '5 min',  completed: true  },
  { id: 6,  title: 'Middleware',                category: 'Express', difficulty: 'intermediate', description: 'Understand how middleware works in Express.',             readTime: '8 min',  completed: false },
  { id: 7,  title: 'Error Handling',            category: 'Express', difficulty: 'intermediate', description: 'Handle errors gracefully in your Express app.',           readTime: '10 min', completed: false },
  { id: 8,  title: 'REST API Design',           category: 'Express', difficulty: 'advanced',     description: 'Design clean and scalable REST APIs.',                    readTime: '12 min', completed: false },
  { id: 9,  title: 'React Basics',              category: 'React',   difficulty: 'beginner',     description: 'Learn components, props and JSX in React.',              readTime: '8 min',  completed: true  },
  { id: 10, title: 'useState & useEffect',      category: 'React',   difficulty: 'beginner',     description: 'Master the two most used React hooks.',                  readTime: '10 min', completed: false },
  { id: 11, title: 'React Router',              category: 'React',   difficulty: 'intermediate', description: 'Add navigation and routing to your React app.',          readTime: '8 min',  completed: false },
  { id: 12, title: 'Redux Toolkit',             category: 'React',   difficulty: 'advanced',     description: 'Manage global state with Redux Toolkit.',                readTime: '15 min', completed: false },
  { id: 13, title: 'Node.js Basics',            category: 'Node',    difficulty: 'beginner',     description: 'Understand how Node.js works under the hood.',           readTime: '8 min',  completed: false },
  { id: 14, title: 'File System Module',        category: 'Node',    difficulty: 'intermediate', description: 'Read and write files using the fs module.',              readTime: '10 min', completed: false },
  { id: 15, title: 'Event Loop',                category: 'Node',    difficulty: 'intermediate', description: 'Deep dive into the Node.js event loop.',                 readTime: '12 min', completed: false },
  { id: 16, title: 'Streams & Buffers',         category: 'Node',    difficulty: 'advanced',     description: 'Handle streaming data efficiently in Node.js.',          readTime: '15 min', completed: false },
]

const categoryInfo = {
  All:     { emoji: '📚', color: 'text-gray-400',    bg: 'bg-gray-500/10',    border: 'border-gray-500/20'    },
  MongoDB: { emoji: '🍃', color: 'text-green-400',   bg: 'bg-green-500/10',   border: 'border-green-500/20'   },
  Express: { emoji: '⚙️', color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20'  },
  React:   { emoji: '⚛️', color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  Node:    { emoji: '🟢', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

const difficultyColor = {
  beginner:     'bg-green-500/10 text-green-400 border border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  advanced:     'bg-red-500/10 text-red-400 border border-red-500/20',
}

const Topics = () => {
  const navigate = useNavigate()

  const [activeCategory,   setActiveCategory]   = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [search,           setSearch]           = useState('')
  const [bookmarks,        setBookmarks]        = useState([])

  const categories  = ['All', 'MongoDB', 'Express', 'React', 'Node']
  const difficulties = ['All', 'beginner', 'intermediate', 'advanced']

  // filter topics
  const filteredTopics = topicsData.filter(topic => {
    const matchCategory   = activeCategory   === 'All' || topic.category   === activeCategory
    const matchDifficulty = activeDifficulty === 'All' || topic.difficulty === activeDifficulty
    const matchSearch     = topic.title.toLowerCase().includes(search.toLowerCase()) ||
                            topic.description.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchDifficulty && matchSearch
  })

  // toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* ======= NAVBAR ======= */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <h1
            onClick={() => navigate('/')}
            className="text-lg font-bold text-white cursor-pointer"
          >
            ⚡ MERN Prep Kit
          </h1>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {['Dashboard', 'Topics', 'Questions', 'Bookmarks'].map(link => (
              <button
                key={link}
                onClick={() => navigate(`/${link.toLowerCase()}`)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${link === 'Topics'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>

        </div>
      </header>

      {/* ======= MAIN CONTENT ======= */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6 py-8 gap-6">

        {/* ======= SIDEBAR ======= */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-6">

          {/* Categories */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              Categories
            </p>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition flex items-center justify-between
                  ${activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                <span>
                  {categoryInfo[category].emoji} {category}
                </span>
                <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">
                  {category === 'All'
                    ? topicsData.length
                    : topicsData.filter(t => t.category === category).length}
                </span>
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              Difficulty
            </p>
            {difficulties.map(level => (
              <button
                key={level}
                onClick={() => setActiveDifficulty(level)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition capitalize
                  ${activeDifficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                {level === 'All' ? '📚 All' :
                 level === 'beginner' ? '🟢 Beginner' :
                 level === 'intermediate' ? '🟡 Intermediate' :
                 '🔴 Advanced'}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              Your Progress
            </p>
            {['MongoDB', 'Express', 'React', 'Node'].map(category => {
              const total     = topicsData.filter(t => t.category === category).length
              const completed = topicsData.filter(t => t.category === category && t.completed).length
              const percent   = Math.round((completed / total) * 100)

              return (
                <div key={category} className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{categoryInfo[category].emoji} {category}</span>
                    <span>{completed}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

        </aside>

        {/* ======= TOPICS MAIN AREA ======= */}
        <main className="flex-1">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Explore All Topics
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Master every MERN concept step by step
            </p>
          </div>

          {/* Search + Filter Bar */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">

            {/* Search */}
            <input
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 mb-4"
            />

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                    ${activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'}
                  `}
                >
                  {categoryInfo[category].emoji} {category}
                </button>
              ))}
            </div>

            {/* Difficulty tabs */}
            <div className="flex flex-wrap gap-2">
              {difficulties.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveDifficulty(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize
                    ${activeDifficulty === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'}
                  `}
                >
                  {level}
                </button>
              ))}
            </div>

          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-white font-medium">{filteredTopics.length}</span> topics
              {activeCategory !== 'All' && (
                <span className={`ml-1 ${categoryInfo[activeCategory].color}`}>
                  in {activeCategory}
                </span>
              )}
            </p>
            {/* Clear filters */}
            {(activeCategory !== 'All' || activeDifficulty !== 'All' || search) && (
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveDifficulty('All')
                  setSearch('')
                }}
                className="text-blue-400 text-xs hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Topics Grid */}
          {filteredTopics.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-400 font-medium">No topics found</p>
              <p className="text-gray-600 text-sm mt-1">
                Try different filters or search term
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveDifficulty('All')
                  setSearch('')
                }}
                className="mt-4 text-blue-400 text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTopics.map(topic => (
                <div
                  key={topic.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition duration-200 group flex flex-col"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {categoryInfo[topic.category].emoji}
                      </span>
                      <span className={`text-xs font-medium ${categoryInfo[topic.category].color}`}>
                        {topic.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Completed badge */}
                      {topic.completed && (
                        <span className="text-xs text-green-400">✅</span>
                      )}
                      {/* Bookmark button */}
                      <button
                        onClick={() => toggleBookmark(topic.id)}
                        className="text-gray-600 hover:text-yellow-400 transition text-sm"
                      >
                        {bookmarks.includes(topic.id) ? '🔖' : '🔖'}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition leading-snug">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                    {topic.description}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                      <span className="text-gray-600 text-xs">
                        ⏱ {topic.readTime}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/topics/${topic.id}`)}
                      className="text-blue-400 text-xs hover:underline"
                    >
                      Read →
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  )
}

export default Topics