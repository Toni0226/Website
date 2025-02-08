// postsRoutes.js
import express from 'express';
import { getRecentPosts } from '../controllers/postController.js';  // 确保路径正确

const router = express.Router();

router.get('/recent-posts', getRecentPosts);

export default router;
