import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Fingerprint from 'express-fingerprint';

import {
  errorHandler as queryErrorHandler
} from 'querymen'
import {
  errorHandler as bodyErrorHandler
} from 'bodymen'
import {
  env
} from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(Fingerprint({
    parameters: [
      // Defaults
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,

      // Additional parameters
      function (next) {
        // ...do something...
        next(null, {
          'param1': 'value1'
        })
      },
      function (next) {
        // ...do something...
        next(null, {
          'param2': 'value2'
        })
      },
    ]
  }))
  
  
  app.use(bodyParser.urlencoded({
    extended: false 
  }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())


  return app
}
