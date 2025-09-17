import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaExternalLinkAlt, FaTag, FaUser, FaClock } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { formatDistanceToNow } from 'date-fns'

const PostCard = ({ post, onLikeUpdate }) => {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(post.user_liked || false)
  const [likeCount, setLikeCount] = useState(post.like_count || 0)
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    if (!user || loading) return
    
    setLoading(true)
    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: post.id })

        if (!error) {
          setIsLiked(false)
          setLikeCount(prev => prev - 1)
          onLikeUpdate?.(post.id, likeCount - 1, false)
        }
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post.id })

        if (!error) {
          setIsLiked(true)
          setLikeCount(prev => prev + 1)
          onLikeUpdate?.(post.id, likeCount + 1, true)
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTutorialIcon = (type) => {
    switch (type) {
      case 'video': return '🎥'
      case 'blog': return '📝'
      default: return '🔗'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-4 break-inside-avoid">
      {/* Image */}
      <div className="relative group">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        
        {/* Overlay with like button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-3">
          <button
            onClick={handleLike}
            disabled={!user || loading}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Description */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        {post.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.description}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                <FaTag className="mr-1" size={8} />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Tutorial Link */}
        {post.tutorial_url && (
          <a
            href={post.tutorial_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
          >
            <span className="mr-1">{getTutorialIcon(post.tutorial_type)}</span>
            View Tutorial
            <FaExternalLinkAlt className="ml-1" size={10} />
          </a>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white" size={10} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {post.profiles?.username || 'Anonymous'}
            </span>
          </div>

          {/* Like Count and Time */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <FaHeart className="text-red-500" size={12} />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock size={10} />
              <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard