import { db } from "../connect.js";

export const getFriendsList = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT u.id, u.username, u.email, u.name, u.profilePic, u.coverPic, u.city, u.website
    FROM users u
    JOIN relationships r ON u.id = r.followedUserId
    WHERE r.followerUserId = ?
  `;

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: 'Error fetching friends list', error: err });
    }
    // 修改这里，即使没有数据也返回200和一个空数组
    if (data.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(data);
  });
};


// import { db } from "../connect.js";

// export const getFriendsList = (req, res) => {
//   // 直接从URL参数中获取userId
//   const userId = req.params.userId;

//   const query = `
//     SELECT u.id, u.username, u.email, u.name, u.profilePic, u.coverPic, u.city, u.website
//     FROM users u
//     JOIN relationships r ON u.id = r.followedUserId
//     WHERE r.followerUserId = ?
//   `;

//   db.query(query, [userId], (err, data) => {
//     if (err) {
//       console.error("Database query error:", err);
//       return res.status(500).json({ message: 'Error fetching friends list', error: err });
//     }
//     if (data.length === 0) {
//       return res.status(404).json({ message: "No friends found" });
//     }
//     res.status(200).json(data);
//   });
// };
