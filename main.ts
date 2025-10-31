import express from 'express';
import { createClient } from './db';
import { createUsersAndPosts } from './utils';

async function main() {
  const db = await createClient();
  
  // Seed database with sample data
  await createUsersAndPosts(db);
  
  const app = express();
  const port = process.env.PORT || 3000;
  
  // Middleware
  app.use(express.json());
  
  // Routes
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ZenStack Express Server!' });
  });
  
  // Get all users
  app.get('/api/users', async (req, res) => {
    try {
      const users = await db.user.findMany({
        include: { posts: true }
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
  // Get all posts
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await db.post.findMany({
        include: { author: true }
      });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });
  
  // Get post by id
  app.get('/api/posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id < 1) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }
      
      const post = await db.post.findUnique({
        where: { id },
        include: { author: true }
      });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json(post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });
  
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
