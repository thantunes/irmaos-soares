interface StepCardProps {
  title: string
  icon: string
  instruction: string
  index: number
}

interface CouponCardProps {
  title: string
  rules: string
  expireDate: string
  code: string
  href: string
  index: number
}

interface CouponProps {
  coupons: CouponCardProps[]
  children: React.ReactNode
}

export { StepCardProps, CouponCardProps, CouponProps }
