const CouponCardSchema = {
  title: 'Coupons',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
    },
    rules: {
      title: 'Regras do cupom',
      type: 'string',
    },
    expireDate: {
      title: 'Data de expiração',
      description: 'Formato: DD/MM/AAAA',
      type: 'string',
    },
    code: {
      title: 'Código do cupom',
      type: 'string',
    },
    href: {
      title: 'Link',
      description: 'URL para página das ofertas',
      type: 'string',
    },
  },
}

const CouponsSchema = {
  title: 'Cupons disponíveis',
  type: 'object',
  properties: {
    coupons: {
      title: 'Cupons',
      type: 'array',
      items: CouponCardSchema,
    },
  },
}

export { CouponsSchema }
