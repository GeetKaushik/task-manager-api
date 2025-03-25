import Task from '../models/task.model.js'

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  try {
    const task = new Task({ title, description, user: req.user.id })
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  const { title, description, completed } = req.body

  try {
    const task = await Task.findById(req.params.id)

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' })
    }

    task.title = title || task.title
    task.description = description || task.description
    task.completed = completed !== undefined ? completed : task.completed

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' })
    }

    await task.deleteOne()
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
