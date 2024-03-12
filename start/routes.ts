/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')

router
  .resource('posts', PostsController)
  .params({
    posts: 'post',
  })
  .use(['create', 'store', 'update', 'destroy'], middleware.auth())

// .apiOnly() // to remove the create and edit routes

// -- Others
router.on('/').render('pages/home')

router.get('truc', async ({ response }) => {
  return response.send('Hello world')
})

router.get('/login', [AuthController, 'login'])

// string
router.get('/about', () => {
  return 'This is the about page.'
})

// Param
router.get('/blogs/:id', ({ params }) => {
  return `This is post with id ${params.id}`
})

// Multiple params
router.get('/blogs/:id/comments/:commentId', ({ params }) => {
  console.log(params.id)
  console.log(params.commentId)
})

// QueryString
router.get('/search', ({ request }) => {
  /*
   * URL: /?sort_by=id&direction=desc
   * qs: { sort_by: 'id', direction: 'desc' }
   */
  return request.qs()
})

// Request params
router.get('search/:slug/comments/:id', async ({ request }) => {
  /*
   * URL: /posts/hello-world/comments/2
   * params: { slug: 'hello-world', id: '2' }
   */
  request.params()
})

/**
 * ‌/posts/1/comments/4	1	4
 *‌/posts/foo-bar/comments/22	foo-bar	22
 */

// Optional params
router.get('/blogs/:id?', ({ params }) => {
  if (!params.id) {
    return 'Showing all blogs'
  }

  return `Showing post with id ${params.id}`
})

// ----- Http part -----

// GET method
router.get('users', () => {}).as('users.index') // 'as' is used to name the route

// POST method
router.post('users', () => {})

// PUT method
router.put('users/:id', () => {})

// PATCH method
router.patch('users/:id', () => {})

// DELETE method
router.delete('users/:id', () => {})

// ----- Use middleware -----
router
  .get('blogs', () => {
    console.log('Inside route handler')

    return 'Viewing all blogs'
  })
  .use((_, next) => {
    console.log('Inside middleware')
    return next()
  })

router.on('toto').redirect('/articles')

// -- Prefix routes ----
router
  .group(() => {
    router.get('users', () => {})
    router.get('payments', () => {})
  })
  .prefix('/api')

// -- location middleware
router.get('posts2', () => {}).use([middleware.userLocation(), middleware.auth()])

// cookies
router.get('cart', async ({ request }) => {
  const cart = request.cookie('cart')
  console.log(cart)
  return cart
})

// delete cookie
router.delete('cart', async ({ response }) => {
  response.clearCookie('cart')
})

// create cookie
router.post('cart', async ({ response, request }) => {
  const id = request.input('product_id')
  response.cookie('cart_items', [{ id }])
})
