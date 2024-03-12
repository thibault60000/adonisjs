import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import GeoIpService from '#services/geoip_service'

@inject()
export default class UserLocationMiddleware {
  constructor(protected geoIpService: GeoIpService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const ip = ctx.request.ip()
    const location = await this.geoIpService.lookup(ip)
    console.log('User location is', location)

    await next()
  }
}
