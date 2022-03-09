import { IProduct } from '../types/product'
import { model, Schema } from 'mongoose'

const options = { collection: 'products', timestamps: true }

const productSchema: Schema = new Schema(
  {
    info: {
      name: {
        type: String,
        required: true
      },
      dimensions: {
        type: String,
        required: true
      },
      weight: {
        type: String,
        required: true
      },
      displayType: {
        type: String,
        required: true
      },
      displaySize: {
        type: String,
        required: true
      },
      displayResolution: {
        type: String,
        required: true
      },
      os: {
        type: String,
        required: true
      },
      cpu: {
        type: String,
        required: true
      },
      internalMemory: {
        type: String,
        required: true
      },
      ram: {
        type: String,
        required: true
      },
      camera: {
        type: String,
        required: true
      },
      batery: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      photo: {
        type: String,
        required: true
      }
    },
    tags: {
      priceRange: {
        type: String,
        required: true
      },
      brand: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      os: {
        type: String,
        required: true
      },
      internalMemory: {
        type: String,
        required: true
      },
      ram: {
        type: String,
        required: true
      },
      displaySize: {
        type: String,
        required: true
      },
      displayResolution: {
        type: String,
        required: true
      },
      camera: {
        type: String,
        required: true
      },
      cpu: {
        type: String,
        required: true
      }
    }
  },
  options
)

export default model<IProduct>('Product', productSchema)
