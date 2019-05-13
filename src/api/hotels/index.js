import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Hotels, { schema } from './model'

const router = new Router()
const { name, stars, price, image, amenities } = schema.tree

/**
 * @api {post} /hotels Create hotels
 * @apiName CreateHotels
 * @apiGroup Hotels
 * @apiParam name Hotels's name.
 * @apiParam starts Hotels's starts.
 * @apiParam price Hotels's price.
 * @apiParam image Hotels's image.
 * @apiParam amenities Hotels's amenities.
 * @apiSuccess {Object} hotels Hotels's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hotels not found.
 */
router.post('/',
  body({ name, stars, price, image, amenities }),
  create)

/**
 * @api {get} /hotels Retrieve hotels
 * @apiName RetrieveHotels
 * @apiGroup Hotels
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of hotels.
 * @apiSuccess {Object[]} rows List of hotels.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({ name, stars, price, image, amenities }),
  index)

/**
 * @api {get} /hotels/:id Retrieve hotels
 * @apiName RetrieveHotels
 * @apiGroup Hotels
 * @apiSuccess {Object} hotels Hotels's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hotels not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /hotels/:id Update hotels
 * @apiName UpdateHotels
 * @apiGroup Hotels
 * @apiParam name Hotels's name.
 * @apiParam starts Hotels's starts.
 * @apiParam price Hotels's price.
 * @apiParam image Hotels's image.
 * @apiParam amenities Hotels's amenities.
 * @apiSuccess {Object} hotels Hotels's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hotels not found.
 */
router.put('/:id',
  body({ name, stars, price, image, amenities }),
  update)

/**
 * @api {delete} /hotels/:id Delete hotels
 * @apiName DeleteHotels
 * @apiGroup Hotels
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Hotels not found.
 */
router.delete('/:id',
  destroy)

export default router
