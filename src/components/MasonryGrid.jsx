import React, { useEffect, useState, useRef } from 'react'
import PostCard from './PostCard'

const MasonryGrid = ({ posts, onLikeUpdate }) => {
  const [columns, setColumns] = useState(3)
  const containerRef = useRef(null)

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.offsetWidth
      if (width < 640) setColumns(1)        // Mobile
      else if (width < 1024) setColumns(2)  // Tablet
      else if (width < 1280) setColumns(3)  // Desktop
      else setColumns(4)                     // Large desktop
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Distribute posts across columns
  const distributePostsToColumns = () => {
    const cols = Array(columns).fill().map(() => [])
    
    posts.forEach((post, index) => {
      const columnIndex = index % columns
      cols[columnIndex].push(post)
    })
    
    return cols
  }

  const columnPosts = distributePostsToColumns()

  return (
    <div 
      ref={containerRef}
      className="w-full"
      style={{
        columnCount: columns,
        columnGap: '1rem',
        columnFill: 'balance'
      }}
    >
      {posts.map((post) => (
        <div key={post.id} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
          <PostCard post={post} onLikeUpdate={onLikeUpdate} />
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid