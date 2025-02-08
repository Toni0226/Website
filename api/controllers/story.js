import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStories = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const q = `SELECT s.*, u.name FROM stories AS s JOIN users AS u ON u.id = s.userId 
                   LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId = ?) LIMIT 4`;

        db.query(q, [userInfo.id], (err, data) => {
            if (err) {
                console.error('Database query error: ', err);
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        });
    });
};

export const addStory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO stories(`img`, `userId`) VALUES (?, ?)";
        const values = [
            req.body.img,
            userInfo.id,
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Story has been created.");
        });
    });
};


export const deleteStory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const q = "DELETE FROM stories WHERE `id` = ? AND `userId` = ?";
        const values = [req.params.id, userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error('Error while deleting story:', err);
                return res.status(500).json(err);
            }
            if (data.affectedRows > 0) {
                return res.status(200).json("Story has been deleted.");
            } else {
                return res.status(403).json("You can delete only your story!");
            }
        });
    });
};


// import { db } from "../connect.js";
// import jwt from "jsonwebtoken";
// import moment from "moment";

// export const getStories = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) {
//         return res.status(401).json("Not logged in!");
//     }

//     jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) {
//             return res.status(403).json("Token is not valid!");
//         }

//         const q = `SELECT s.*, u.name FROM stories AS s JOIN users AS u ON u.id = s.userId 
//                    LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId = ?) LIMIT 4`;

//         db.query(q, [userInfo.id], (err, data) => {
//             if (err) {
//                 console.error('Database query error: ', err);
//                 return res.status(500).json(err);
//             }
//             return res.status(200).json(data);
//         });
//     });
// };

// export const addStory = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//       if (err) return res.status(403).json("Token is not valid!");

//       // 注意这里去掉了 `createdAt`
//       const q = "INSERT INTO stories(`img`, `userId`) VALUES (?, ?)";
//       const values = [
//           req.body.img,
//           userInfo.id,
//       ];

//       db.query(q, values, (err, data) => {
//           if (err) return res.status(500).json(err);
//           return res.status(200).json("Story has been created.");
//       });
//   });
// };


// export const deleteStory = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) {
//         return res.status(401).json("Not logged in!");
//     }

//     jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) {
//             return res.status(403).json("Token is not valid!");
//         }

//         const q = "DELETE FROM stories WHERE `id` = ? AND `userId` = ?";
//         const values = [req.params.id, userInfo.id];

//         db.query(q, values, (err, data) => {
//             if (err) {
//                 console.error('Error while deleting story:', err);
//                 return res.status(500).json(err);
//             }
//             if (data.affectedRows > 0) {
//                 return res.status(200).json("Story has been deleted.");
//             } else {
//                 return res.status(403).json("You can delete only your story!");
//             }
//         });
//     });
// };

// import { db } from "../connect.js";
// import jwt from "jsonwebtoken";
// import moment from "moment";

// export const getStories = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("Not logged in!");

//     jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         console.log(userInfo.id);  // 修改此处以正确输出用户ID

//         const q = `SELECT s.*, u.name FROM stories AS s JOIN users AS u ON u.id = s.userId 
//         LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId= ?) LIMIT 4`;

//         db.query(q, [userInfo.id], (err, data) => {
//             if (err) {
//                 console.error('Database query error: ', err);
//                 return res.status(500).json(err);
//             }
//             return res.status(200).json(data);
//         });
//     });
// };

// export const addStory = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("Not logged in!");

//     jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         const q = "INSERT INTO stories(`img`, `createdAt`, `userId`) VALUES (?)";
//         const values = [
//             req.body.img,
//             moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//             userInfo.id,
//         ];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("Story has been created.");
//         });
//     });
// };

// export const deleteStory = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("Not logged in!");

//     jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";

//         db.query(q, [req.params.id, userInfo.id], (err, data) => {
//             if (err) return res.status(500).json(err);
//             if (data.affectedRows > 0)
//                 return res.status(200).json("Story has been deleted.");
//             return res.status(403).json("You can delete only your story!");
//         });
//     });
// };
