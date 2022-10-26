import mongoose from "mongoose"

import Groups from "../models/Group"
import Tasks from "../models/Task"

export default async (groupID: mongoose.Types.ObjectId | string) => {
    const group = await Groups.findById(groupID)
    const tasks = []
    for (const taskID of group?.tasks || []) tasks.push(await Tasks.findById(taskID))
    return { _id: group?._id, title: group?.title, tasks }
}
