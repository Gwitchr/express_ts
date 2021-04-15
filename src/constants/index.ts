export const TOKEN_EXPIRATION = '7d';

export const FORG_PASS_DURATION = 3600000 * 3;

export const MAIL_INFO_DEFAULTS = '"N12 Estudio" <connection@n12.mx>';

export const ADMIN_MAIL =
  process.env.NODE_ENV === 'development'
    ? 'luiscasillas@n12.mx'
    : 'info@n12.mx';

// export const SOCIAL_SHARE = {
//   FB: "https%3A%2F%2Fwww.tucarta.menu%2F&amp",
//   TW:
//     "%C3%9Anete%20a%20TuCarta.Menu,%20Abre%20tu%20men%C3%BA%20digital%20en%20%C2%A1TuCartaPuntoMenu!%20https%3A%2F%2Fwww.tucarta.menu%2F&amp",
//   WA:
//     "%C3%9Anete%20a%20TuCarta.Menu,%20Abre%20tu%20men%C3%BA%20digital%20en%20%C2%A1TuCartaPuntoMenu!https%3A%2F%2Fwww.tucarta.menu%2F&amp"
// };

// export const BMX_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/';
// export const lang = process.env.DEFAULT_LANG;

export const TEMPLATE = {
  NEW_USER: 'new_user',
  NEW_MANAGER: 'new_manager',
  RESET_PASSW: 'reset_password',
  SUBSCRIBER: 'template_subscriber',
  SUBSCRIBER_ADMIN: 'template_subs_admin',
  LEAD: 'lead_client',
  LEAD_ADMIN: 'lead_admin',
  ASSISTANCE: 'assistance',
  ASSISTANCE_ADMIN: 'assistance_admin',
  SERVICE_ST_CLIENT: 'service_st_client',
  SERVICE_ST_ADMIN: 'service_st_admin',
  COUPON: 'generic_coupon',
  DEMO: 'demo',
  NEW_ORDER: 'new_order',
  NEW_ORDER_ADMIN: 'new_order_admin'
} as const;

export const MAIL_SUBJECTS = {
  NEW_ORDER: {
    es: 'Nueva orden',
    en: 'New Order'
  }
} as const;

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT || 3000}`
    : '';
