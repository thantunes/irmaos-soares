import React from 'react'
import HowToUse from './HowToUse'
import { CouponsSchema } from './Coupons.schema'
import AvailableCoupons from './AvailableCoupons'
import { CouponProps } from './Coupons.types'

const Coupons = ({ coupons, children }: CouponProps) => {

  return (
    <>
      <HowToUse />
      <AvailableCoupons coupons={coupons} children={children} />
    </>
  )
}

Coupons.getSchema = () => CouponsSchema
export default Coupons
