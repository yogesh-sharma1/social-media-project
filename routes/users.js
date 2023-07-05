import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* Read Routes */
router.get('/:id', verifyToken, getUser); //get users

router.get('/:id/friends', verifyToken, getUserFriends); //get user's friends

/* Update Routes */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend); //add or remove friends

export default router;