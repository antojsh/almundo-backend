import { Router } from 'express'
import hotels from './hotels'

const router = new Router()




router.use('/hotels', hotels)




export default router
