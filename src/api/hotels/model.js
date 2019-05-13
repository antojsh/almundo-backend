import mongoose, { Schema } from 'mongoose'

const hotelsSchema = new Schema({
  name: {
    type: String
  },
  stars: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  amenities: {
    type: [String]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

hotelsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      stars: this.stars,
      price: this.price,
      image: this.image,
      amenities: this.amenities,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Hotels', hotelsSchema)

export const schema = model.schema
export default model
