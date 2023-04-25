import { rest } from 'msw'
import db from '~/utils/msw/test.json'
const baseURL = 'http://localhost:3001'

export const handlers = [
  rest.get(`${baseURL}/tasks`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(db.tasks)
    )
  }),
  rest.post(`${baseURL}/tasks`, (req, res, ctx) => {
    const { text } = req.json()

    return res(
      ctx.status(200),
      ctx.json({
        id: 10,
        text: text,
        isDone: false,
      })
    )
  }),
  rest.put(`${baseURL}/tasks/:taskId`, (req, res, ctx) => {
    const { taskId } = req.params
    const task = req.json()

    return res(
      ctx.status(200),
      ctx.json(db.tasks)
    )
  }),
  rest.delete(`${baseURL}/:taskId`, (req, res, ctx) => {
    const { taskId } = req.params

    return res(
      ctx.status(200),
      ctx.json(db.tasks)
    )
  }),
]