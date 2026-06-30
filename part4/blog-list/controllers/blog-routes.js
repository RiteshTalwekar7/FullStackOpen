import e, { response } from 'express'
import logger from '../utils/logger.js'
import Blog from '../models/blog.js'

const blogRouter = e.Router()

blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  if (!blog) {
    return response.json({ error: 'content missing' });
  }

  blog.save()
    .then(savedBlog => {
      logger.info(`blog saved successfully: ${savedBlog}`)
      return response.json(savedBlog);
    })
    .catch(error => {
      logger.error(error)
      next(error)
    })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      return response.json(blog)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(deletedBlog => {
      logger.info('blog deleted successfully', deletedBlog)
      return response.json(deletedBlog)
    })
    .catch(error => next(error))
})

export default blogRouter