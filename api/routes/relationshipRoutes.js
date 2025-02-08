import express from 'express';
const router = express.Router();

// 导入控制器
import { followUser, unfollowUser, getFollowingUsers } from '../controllers/relationshipController.js';

// 设置关注和取消关注的路由
router.post('/', followUser);

router.delete('/:followerUserId/:followedUserId', unfollowUser);
router.get('/:userId', getFollowingUsers); // 新增获取关注列表的路由

export default router;
