import { Hotels } from '.'

let hotels

beforeEach(async () => {
  hotels = await Hotels.create({ name: 'test', starts: 'test', price: 'test', image: 'test', amenities: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = hotels.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hotels.id)
    expect(view.name).toBe(hotels.name)
    expect(view.starts).toBe(hotels.starts)
    expect(view.price).toBe(hotels.price)
    expect(view.image).toBe(hotels.image)
    expect(view.amenities).toBe(hotels.amenities)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = hotels.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hotels.id)
    expect(view.name).toBe(hotels.name)
    expect(view.starts).toBe(hotels.starts)
    expect(view.price).toBe(hotels.price)
    expect(view.image).toBe(hotels.image)
    expect(view.amenities).toBe(hotels.amenities)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
