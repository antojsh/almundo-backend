import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Hotels } from '.'

const app = () => express(apiRoot, routes)

let hotels

beforeEach(async () => {
  hotels = await Hotels.create({})
})

test('POST /hotels 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', starts: 'test', price: 'test', image: 'test', amenities: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.starts).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.amenities).toEqual('test')
})

test('GET /hotels 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /hotels/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${hotels.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hotels.id)
})

test('GET /hotels/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /hotels/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${hotels.id}`)
    .send({ name: 'test', starts: 'test', price: 'test', image: 'test', amenities: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hotels.id)
  expect(body.name).toEqual('test')
  expect(body.starts).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.amenities).toEqual('test')
})

test('PUT /hotels/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', starts: 'test', price: 'test', image: 'test', amenities: 'test' })
  expect(status).toBe(404)
})

test('DELETE /hotels/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hotels.id}`)
  expect(status).toBe(204)
})

test('DELETE /hotels/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
