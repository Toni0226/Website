// postController.js
import { db } from "../connect.js";  // 确保这是正确的数据库连接模块路径

export const getRecentPosts = (req, res) => {
  const query = `
    SELECT p.id, p.desc, p.img, p.createdAt, u.username, u.profilePic
    FROM posts p
    JOIN users u ON p.userId = u.id
    ORDER BY p.createdAt DESC
    LIMIT 5;  
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Database error", error: err.toString() });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No recent posts found" });
    }
    res.json(results);
  });
};
