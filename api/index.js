import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// 导入路由
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationshipRoutes.js";
import storyRoutes from './routes/stories.js';
import friendRoutes from './routes/friendRoutes.js';  // 确保已导入
import postsRoutes from './routes/postsRoutes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../project/public/upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// CORS and Middleware setup
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(cookieParser());
app.use(express.json());

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
    if (req.file) {
        res.status(200).json({ filename: req.file.filename, path: `/upload/${req.file.filename}` });
    } else {
        res.status(400).json({ message: "No file uploaded" });
    }
});

// Mount other routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/friends", friendRoutes);  // 新挂载的朋友列表路由
app.use('/api', postsRoutes);
app.use('/api/followRelationship', relationshipRoutes);


// Server listening
app.listen(8800, () => {
    console.log("Server running on port 8800");
});


// import express from "express";
// import multer from "multer";
// import path from "path";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import fs from 'fs'; // 导入文件系统库来检查和创建目录

// // 导入路由
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import commentRoutes from "./routes/comments.js";
// import likeRoutes from "./routes/likes.js";
// import relationshipRoutes from "./routes/relationships.js";
// import storyRoutes from './routes/stories.js';
// import friendRoutes from './routes/friendRoutes.js'; 

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();

// // 确保上传目录存在
// const uploadDir = path.join(__dirname, '../project/public/upload'); // 修正目录路径
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true }); // 如果目录不存在，则创建它
// }

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });

// const upload = multer({ storage });

// // CORS and Middleware setup
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));
// app.use(cookieParser());
// app.use(express.json());

// // File upload route
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     if (req.file) {
//         res.status(200).json({ filename: req.file.filename, path: `/upload/${req.file.filename}` });
//     } else {
//         res.status(400).json({ message: "No file uploaded" });
//     }
// });

// // Mount other routers
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
// app.use("/api/relationships", relationshipRoutes);
// app.use("/api/stories", storyRoutes);

// // Server listening
// app.listen(8800, () => {
//     console.log("Server running on port 8800");
// });
