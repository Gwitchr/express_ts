export interface IMailOptions {
  to: string;
  subject: string;
  context: {};
  template: string;
  from?: string;
  replyTo?: string;
}

export enum Templates {
  NEW_USER = 'new_user',
  NEW_MANAGER = 'new_manager',
  RESET_PASSW = 'reset_password',
  SUBSCRIBER = 'template_subscriber',
  SUBSCRIBER_ADMIN = 'template_subs_admin',
  LEAD = 'lead_client',
  LEAD_ADMIN = 'lead_admin',
  ASSISTANCE = 'assistance',
  ASSISTANCE_ADMIN = 'assistance_admin',
  SERVICE_ST_CLIENT = 'service_st_client',
  SERVICE_ST_ADMIN = 'service_st_admin',
  COUPON = 'generic_coupon',
  DEMO = 'demo',
  NEW_ORDER = 'new_order',
  NEW_ORDER_ADMIN = 'new_order_admin'
}
