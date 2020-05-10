const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const gp = require('./gamepadClient')

// const html = fs.readFileSync('./index.html').toString()
const app = new Koa()
const router = new Router()

router.get('/', ctx => {
  ctx.type = 'html'
  const html = fs.readFileSync('./index.html')
  ctx.body = html  
})

router.post('/event', ctx => {
  console.log(ctx.request.body)
  ctx.body = { status: 'ok' }
})

router.get('/e', ctx => {
  const data = ctx.request.query.d
  gp.sendCommand(data)

  console.log(ctx.request.query)
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = 'ok'
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(3000)

process.on('SIGINT', function() {
  server.close()
  gp.closeSocket()
})