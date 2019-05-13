import { success, notFound } from '../../services/response/'
import { Hotels } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Hotels.create(body)
    .then((hotels) => hotels.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
    const customQuery = {}

    if(query.name){
      customQuery['name']= {  $regex : query.name ,   $options : 'i'  } 
    }

    if(query.stars){
      customQuery['stars'] = { $in: query.stars.split(',') } 
    }

    Hotels.count(customQuery)
    .then(count => Hotels.find(customQuery, select)
      .then((hotels) => ({
        count,
        rows: hotels.map((hotels) => hotels.view())
      }))
    )
    .then(success(res))
    .catch(next)
  }

export const show = ({ params }, res, next) =>
  Hotels.findById(params.id)
    .then(notFound(res))
    .then((hotels) => hotels ? hotels.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Hotels.findById(params.id)
    .then(notFound(res))
    .then((hotels) => hotels ? Object.assign(hotels, body).save() : null)
    .then((hotels) => hotels ? hotels.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Hotels.findById(params.id)
    .then(notFound(res))
    .then((hotels) => hotels ? hotels.remove() : null)
    .then(success(res, 204))
    .catch(next)
