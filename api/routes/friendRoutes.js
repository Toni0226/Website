import express from 'express';
import { getFriendsList } from '../controllers/friendController.js';

const router = express.Router();

// 修改路由以接受用户ID作为参数
router.get('/:userId', getFriendsList);

export default router;
