# CraftCommunity - Complete Setup Guide

## Overview
CraftCommunity is now a complete Pinterest-style social platform for Minecraft builders. Users can:
- 🏠 View the beautiful landing page with Minecraft-themed design
- 🔐 Sign up/sign in with email or Google authentication  
- 📸 Upload images of their builds with descriptions and tutorial links
- ❤️ Like/unlike posts from other users
- 🏷️ Add and filter by tags
- 📱 View posts in a responsive masonry grid layout
- 🔒 Protected routes that require authentication

## Quick Start

### 1. Environment Setup
1. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 2. Supabase Configuration
Follow the complete database setup in `supabase-schema.md`:

1. Create the required tables: `profiles`, `posts`, `likes`
2. Set up Row Level Security (RLS) policies
3. Create the `craft-images` storage bucket
4. Add the trigger functions for auto-profile creation and like counting

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```

## Application Structure

### Pages
- **Landing Page** (`/`) - Marketing page with auth integration
- **Feed Page** (`/app`) - Main Pinterest-style feed (protected route)

### Key Components

#### Authentication System
- `AuthContext.jsx` - Global auth state management
- `AuthModal.jsx` - Sign in/up modal with email and Google auth
- `ProtectedRoute.jsx` - Route wrapper requiring authentication

#### Feed Components
- `FeedPage.jsx` - Main app page with search, filters, and upload
- `PostCard.jsx` - Individual post display with like functionality
- `MasonryGrid.jsx` - Responsive Pinterest-style layout
- `ImageUploadModal.jsx` - Complete upload form with image, tags, tutorials

#### Updated Landing Components
- `Header.jsx` - Now includes auth buttons and navigation
- `Hero.jsx` - Call-to-action buttons lead to app or auth

### Features Implemented

#### 🔐 Authentication
- Email/password and Google OAuth via Supabase Auth
- Auto-profile creation on signup
- Protected routes for authenticated users
- Persistent sessions across browser refreshes

#### 📸 Image Upload
- Drag & drop or click to upload images
- Image preview before upload
- Upload to Supabase Storage in organized folders
- Support for PNG, JPG, GIF up to 10MB
- Optional tutorial links (blog/video/other)
- Tag system for categorization

#### 🎯 Pinterest-Style Feed
- Responsive masonry grid layout (1-4 columns based on screen size)
- Infinite scroll ready (currently loads all posts)
- Real-time like/unlike functionality
- Post metadata: user, timestamp, like count
- Tag display and filtering

#### 🔍 Search & Filtering
- Search by title, description, or username
- Filter by tags (toggle multiple tags)
- Sort by latest or most liked
- Real-time filtering with immediate results

#### 📱 Responsive Design
- Mobile-first responsive design
- Optimized for all screen sizes
- Touch-friendly interface
- Minecraft-themed throughout

## Database Schema

### Tables Created
```sql
-- User profiles (extends Supabase auth.users)
profiles (id, username, full_name, avatar_url, bio, created_at, updated_at)

-- Posts with images and metadata  
posts (id, user_id, title, description, image_url, image_path, tutorial_url, tutorial_type, tags, like_count, created_at, updated_at)

-- Like relationships
likes (id, user_id, post_id, created_at)
```

### Storage
- `craft-images` bucket for user uploaded images
- Organized by user ID folders
- Public read access, authenticated write access

## Development Notes

### File Structure
```
src/
├── components/
│   ├── AuthModal.jsx           # Sign in/up modal
│   ├── Header.jsx              # Updated with auth
│   ├── Hero.jsx                # Updated with app navigation  
│   ├── ImageUploadModal.jsx    # Upload form
│   ├── MasonryGrid.jsx         # Pinterest layout
│   ├── PostCard.jsx            # Individual post
│   └── ProtectedRoute.jsx      # Auth wrapper
├── contexts/
│   └── AuthContext.jsx         # Global auth state
├── lib/
│   └── supabase.js            # Supabase client config
├── pages/
│   ├── FeedPage.jsx           # Main app page
│   └── Landing.jsx            # Marketing page
└── App.jsx                    # Updated with routing
```

### Key Dependencies
- `@supabase/supabase-js` - Database and auth
- `react-router-dom` - Routing
- `react-icons` - Icons throughout app
- `framer-motion` - Animations
- `date-fns` - Date formatting
- `tailwindcss` - Styling

## Next Steps & Potential Enhancements

### Immediate Improvements
1. **Infinite Scroll** - Load posts in batches for better performance
2. **Image Optimization** - Resize/compress images on upload
3. **User Profiles** - Dedicated profile pages with user's posts
4. **Comments** - Add commenting system to posts
5. **Email Verification** - Require email verification for signup

### Advanced Features
1. **Real-time Updates** - Use Supabase subscriptions for live likes
2. **Push Notifications** - Notify users of likes/comments
3. **Advanced Search** - Full-text search with filters
4. **Build Categories** - Predefined categories (Medieval, Modern, Redstone, etc.)
5. **Tutorial Integration** - Embedded video players for tutorials
6. **Admin Panel** - Content moderation and user management

### Performance Optimizations
1. **Image CDN** - Use Supabase CDN or external CDN
2. **Caching** - Cache posts and user data
3. **Progressive Loading** - Load images progressively
4. **Database Indexing** - Add indexes for common queries

## Troubleshooting

### Common Issues
1. **Auth not working** - Check Supabase URL and anon key in `.env.local`
2. **Images not uploading** - Verify storage bucket policies
3. **Likes not updating** - Check RLS policies on likes table
4. **Navigation issues** - Ensure React Router is properly configured

### Database Issues
1. **RLS Policies** - Make sure all tables have proper RLS policies
2. **Triggers** - Verify like count and profile creation triggers are active
3. **Storage Policies** - Check that storage bucket has correct access policies

The application is now complete and ready for production with proper environment setup and database configuration!