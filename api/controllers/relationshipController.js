import { db } from "../connect.js";

// 关注用户
export const followUser = (req, res) => {
  const { followerUserId, followedUserId } = req.body;
  if (!followerUserId || !followedUserId) {
    return res.status(400).json({ message: "Missing follower or followed user ID" });
  }

  const insertQuery = `
    INSERT INTO relationships (followerUserId, followedUserId)
    VALUES (?, ?)
  `;
  db.query(insertQuery, [followerUserId, followedUserId], (err, result) => {
    if (err) {
      console.error("Error inserting into relationships:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.status(200).json({ message: "Successfully followed user" });
  });
};

// 取消关注用户
export const unfollowUser = (req, res) => {
    const { followerUserId, followedUserId } = req.params;  // 从路径参数中获取
    if (!followerUserId || !followedUserId) {
      return res.status(400).json({ message: "Missing follower or followed user ID" });
    }

  const deleteQuery = `
    DELETE FROM relationships
    WHERE followerUserId = ? AND followedUserId = ?
  `;
  db.query(deleteQuery, [followerUserId, followedUserId], (err, result) => {
    if (err) {
      console.error("Error deleting from relationships:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Relationship not found" });
    }
    res.status(200).json({ message: "Successfully unfollowed user" });
  });
};


// 获取当前用户关注的用户ID列表
export const getFollowingUsers = (req, res) => {
    const { userId } = req.params; // 从路径参数中获取当前用户ID
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }
  
    const selectQuery = `
      SELECT followedUserId
      FROM relationships
      WHERE followerUserId = ?
    `;
    db.query(selectQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error retrieving follow data:", err);
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      // 提取所有关注的用户ID
      const followedUserIds = results.map(row => row.followedUserId);
      res.json(followedUserIds); // 返回关注的用户ID数组
    });
  };
  
  
