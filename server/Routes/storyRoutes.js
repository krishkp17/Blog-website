import express from 'express'
import { createStory, deleteStory, fetchStory, updateStory } from "../controllers/storyController.js";



const storyRouter = express.Router()

storyRouter.post('/create',createStory)
storyRouter.get('/get',fetchStory)
storyRouter.patch('/update/:id',updateStory)
storyRouter.delete('/delete/:id',deleteStory)


export default storyRouter;