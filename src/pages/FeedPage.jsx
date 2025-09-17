import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaFilter, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import MasonryGrid from '../components/MasonryGrid'
import ImageUploadModal from '../components/ImageUploadModal'

const FeedPage = () => {
  const { user, signOut } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest') 
  const [selectedTags, setSelectedTags] = useState([])
  const [availableTags, setAvailableTags] = useState([])

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          ),
          likes!inner (
            user_id
          )
        `)

      // Apply sorting
      if (sortBy === 'latest') {
        query = query.order('created_at', { ascending: false })
      } else if (sortBy === 'most_liked') {
        query = query.order('like_count', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error

      // Process posts to include user like status
      const processedPosts = data.map(post => ({
        ...post,
        user_liked: user ? post.likes.some(like => like.user_id === user.id) : false
      }))

      setPosts(processedPosts)
      
      // Extract unique tags
      const tags = new Set()
      data.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => tags.add(tag))
        }
      })
      setAvailableTags(Array.from(tags).sort())

    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [sortBy, user])

  // Filter posts based on search and tags
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.profiles?.username && post.profiles.username.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTags = selectedTags.length === 0 || 
      (post.tags && selectedTags.every(tag => post.tags.includes(tag)))

    return matchesSearch && matchesTags
  })

  const handleUploadSuccess = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const handleLikeUpdate = (postId, newLikeCount, isLiked) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, like_count: newLikeCount, user_liked: isLiked }
        : post
    ))
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">CraftCommunity</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search builds, creators, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Share Build
              </button>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaUser className="text-green-600" />
                <span className="font-medium">{user?.user_metadata?.username || user?.email}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign Out"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="latest">Latest</option>
                <option value="most_liked">Most Liked</option>
              </select>
            </div>

            {/* Tag Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {availableTags.slice(0, 8).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              {posts.length === 0 ? (
                <>
                  <h3 className="text-xl font-medium mb-2">No builds yet!</h3>
                  <p>Be the first to share your amazing Minecraft creation.</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium mb-2">No builds found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </>
              )}
            </div>
            {posts.length === 0 && (
              <button
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Share Your First Build
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredPosts.length} build{filteredPosts.length !== 1 ? 's' : ''}
                {selectedTags.length > 0 && (
                  <span> filtered by: {selectedTags.join(', ')}</span>
                )}
              </p>
            </div>
            <MasonryGrid posts={filteredPosts} onLikeUpdate={handleLikeUpdate} />
          </>
        )}
      </main>

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  )
}

export default FeedPage































































