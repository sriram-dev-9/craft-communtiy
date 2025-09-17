# 🏗️ CraftCommunity

> **A Pinterest-style social platform for Minecraft builders to showcase, share, and discover amazing creations.**

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)](https://vitejs.dev/)

## 🌟 Features

### 🎨 **Beautiful Minecraft-Themed UI**
- Pixel-perfect Minecraft-inspired design with custom animations
- Responsive masonry grid layout (Pinterest-style)
- Smooth transitions and hover effects using Framer Motion
- Mobile-first responsive design for all devices

### 🔐 **Secure Authentication**
- Email/password authentication via Supabase Auth
- Automatic profile creation on signup
- Protected routes requiring authentication
- Persistent user sessions across browser refreshes

### 📸 **Image Upload & Sharing**
- **Drag & Drop Upload**: Intuitive image upload with preview
- **Rich Metadata**: Add titles, descriptions, and tags to builds
- **Tutorial Links**: Optional blog/video tutorial links
- **Cloud Storage**: Secure image storage via Supabase Storage (up to 10MB)
- **Organized Storage**: User-specific folders for better management

### 🎯 **Pinterest-Style Feed**
- **Responsive Masonry Grid**: 1-4 columns based on screen size
- **Real-time Interactions**: Like/unlike posts with instant updates
- **User Profiles**: Display username and creation timestamps
- **Rich Content**: Images, descriptions, tags, and tutorial links
- **Performance Optimized**: Efficient rendering for smooth scrolling

### 🔍 **Advanced Search & Filtering**
- **Global Search**: Search by title, description, or username
- **Tag Filtering**: Filter by multiple tags simultaneously
- **Smart Sorting**: Sort by latest posts or most liked
- **Real-time Results**: Instant filtering as you type
- **Popular Tags**: Quick access to trending build categories

### ❤️ **Social Interactions**
- **Like System**: Like/unlike builds with visual feedback
- **Like Counter**: Real-time like count updates
- **User Attribution**: See who created each build
- **Engagement Tracking**: Sort by popularity and engagement

### 🏷️ **Tag System**
- **Categorization**: Organize builds with custom tags
- **Popular Tags**: Discover trending build styles
- **Multi-tag Filtering**: Combine multiple tags for precise searches
- **Tag Suggestions**: Easy tag management during upload

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account and project

### 1. Clone & Install
```bash
git clone https://github.com/sriram-dev-9/craft-communtiy.git
cd craft-communtiy/project-files
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.local.example .env.local

# Add your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the SQL commands from `supabase-schema.md` in your Supabase SQL Editor:
```sql
-- Creates tables: profiles, posts, likes
-- Sets up Row Level Security (RLS)
-- Creates storage bucket and policies
-- Adds triggers for auto-profile creation and like counting
```

### 4. Launch Application
```bash
npm run dev
```
Visit `http://localhost:5173` to see your CraftCommunity!

## 📱 User Journey

### 🏠 **Landing Experience**
1. **Stunning Homepage**: Minecraft-themed landing with animated elements
2. **Feature Showcase**: Highlights of platform capabilities
3. **Community Stats**: Active user and build statistics
4. **Call-to-Action**: Multiple entry points to join the community

### 🔑 **Authentication Flow**
1. **Seamless Signup**: Quick registration with email and username
2. **Secure Login**: Fast and secure authentication
3. **Auto-Profile**: Automatic profile creation on signup
4. **Protected Access**: Secure access to main application

### � **Sharing Builds**
1. **Easy Upload**: Drag & drop or click to upload images
2. **Rich Details**: Add compelling titles and descriptions
3. **Tag Organization**: Categorize with relevant tags
4. **Tutorial Links**: Share your building guides (optional)
5. **Instant Sharing**: Immediate visibility in the community feed

### � **Discovering Content**
1. **Pinterest Feed**: Beautiful masonry grid of all builds
2. **Smart Search**: Find specific builds or creators
3. **Tag Exploration**: Browse by building styles and themes
4. **Engagement**: Like builds you love and support creators

## �️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend framework | 18.3.1 |
| **Vite** | Build tool & dev server | 5.4.2 |
| **Supabase** | Backend & database | 2.39.0 |
| **Tailwind CSS** | Styling framework | 3.4.17 |
| **Framer Motion** | Animations | 11.0.8 |
| **React Router** | Client-side routing | 7.1.0 |
| **React Icons** | Icon library | 5.4.0 |
| **date-fns** | Date formatting | 4.1.0 |

## 📊 Database Schema

### Core Tables
```sql
profiles     # User profiles (extends Supabase auth)
├── id, username, full_name, avatar_url, bio
├── created_at, updated_at

posts        # Build submissions  
├── id, user_id, title, description
├── image_url, image_path, tutorial_url, tutorial_type
├── tags[], like_count, created_at, updated_at

likes        # User interactions
├── id, user_id, post_id, created_at
└── Unique constraint: (user_id, post_id)
```

### Storage
- **craft-images bucket**: User uploaded build images
- **Organized structure**: `user_id/timestamp.ext`
- **Public access**: Read permissions for all users
- **Secure uploads**: Authenticated write access only

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access controls
- **Authenticated Uploads**: Secure image upload permissions
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Parameterized queries via Supabase
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Secure cross-origin requests

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load as needed
- **Responsive Images**: Optimized for different screen sizes
- **Efficient Queries**: Optimized database queries with proper indexing
- **Caching**: Browser caching for static assets
- **Bundle Optimization**: Tree-shaking and code splitting with Vite

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Environment Variables for Production
```bash
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Minecraft** - Inspiration for the theming and community
- **Pinterest** - UI/UX inspiration for the feed layout
- **Supabase** - Excellent backend-as-a-service platform
- **React Community** - Amazing ecosystem and tools

---

<div align="center">
  <p><strong>Made with ❤️ for the Minecraft building community</strong></p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-deployment">Deployment</a>
  </p>
</div>