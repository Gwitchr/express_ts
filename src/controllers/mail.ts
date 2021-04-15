import express from 'express';
import transporter from '../config/mail';
import { MAIL_INFO_DEFAULTS } from '../constants';
import { IMailOptions } from '../types';

const app = express.Router();

export const send_mail = (mail_options: IMailOptions) => {
  try {
    const mail_options_updated = { ...mail_options };
    mail_options_updated.from = MAIL_INFO_DEFAULTS;
    if (!mail_options.replyTo) {
      mail_options_updated.replyTo = MAIL_INFO_DEFAULTS;
    }
    return transporter.sendMail(mail_options_updated);
  } catch (error) {
    return {
      error
    };
  }
};

export default app;
