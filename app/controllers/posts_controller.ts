import { HttpContext } from '@adonisjs/core/http'
import { createPostValidator, updatePostValidator } from '#validators/post'

export default class PostsController {
  async store({ request }: HttpContext) {
    const data = request.all()
    console.log('store', data)

    const payload = await createPostValidator.validate(data)

    //  const payload = await request.validateUsing(createPostValidator)

    return payload
  }

  async update({ request }: HttpContext) {
    const data = request.all()
    console.log('update', data)

    const payload = await updatePostValidator.validate(data)
    return payload
  }
}
