import  express  from "express";
import {getUser, updateUser, getRecommendedUsers} from "../controllers/user.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get('/recommend/:userId', getRecommendedUsers)

export default router