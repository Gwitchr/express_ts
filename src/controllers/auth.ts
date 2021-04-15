import { Response, NextFunction, Request } from 'express';
import { IUser, IStatus, IUserPopulated } from '../types';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User, Status } from '../models';
import { compareSync, generateToken, setHashSync } from '../utils';
import { send_mail } from './mail';
import { TEMPLATE, TOKEN_EXPIRATION, FORG_PASS_DURATION } from '../constants';
import { USER_MESSAGE } from '../constants/messages';
import { USER_STATUS, SYS_STATUS_NOTE } from '../constants/status';
import { USER_ROLES } from '../constants/user_roles';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email, password }
    // headers: { host }
  } = req;
  try {
    const user_body = { ...req.body };
    // if (line_1) {
    //   const { line_2, postal_code, state, city } = req.body;
    //   const new_address = await new Address({
    //     line_1,
    //     line_2,
    //     postal_code,
    //     state,
    //     city
    //   }).save();
    //   user_body.addresses = [new_address._id];
    // }
    const new_status: IStatus = await new Status({
      status: USER_STATUS.INACTIVE,
      note: SYS_STATUS_NOTE
    }).save();
    const verification_code: string = uuid();
    const new_user: IUser = await new User({
      ...user_body,
      status: [new_status._id],
      role: USER_ROLES.USER,
      password: setHashSync(password),
      verification_code
    }).save();

    // const hostname = ( req.headers.host.match(/:/g) )
    // ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host
    const mail_options = {
      to: email,
      subject: 'Por favor activa tu cuenta',
      context: {
        email,
        // mail test
        // url: `${process.env.FRONT_URL}/verify/${new_user._id}/${new_user.verification_code}`,
        url: `${process.env.FRONT_URL}/verify/${new_user._id}/${verification_code}`
      },
      template: TEMPLATE.NEW_USER
    };
    (new_user.password = null), (new_user.verification_code = null);

    const sentMail = await send_mail(mail_options);

    res.status(201).json({
      message: USER_MESSAGE.CREATED,
      // mail test
      // new_user,
      user: new_user,
      sentMail
    });
  } catch (error) {
    let err = error;
    if (error && error.hasOwnProperty('code') && error.code === 11000) {
      err = USER_MESSAGE.DUPLICATE;
    }
    next(err);
  }
};

// export const resend_activation = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const {
//     params: { user_id }
//   } = req;
//   try {
//     const { email, _id, verification_code } = await User.findById(user_id);
//     // const hostname = ( req.headers.host.match(/:/g) )
//     // ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host
//     const mail_options = {
//       to: email,
//       subject: 'Por favor activa tu cuenta',
//       context: {
//         email,
//         // mail test
//         // url: `${process.env.FRONT_URL}/verify/${new_user._id}/${new_user.verification_code}`,
//         url: `${process.env.FRONT_URL}/verify/${_id}/${verification_code}`,
//         facebook_text: SOCIAL_SHARE.FB,
//         whatsapp_text: SOCIAL_SHARE.WA,
//         twitter_text: SOCIAL_SHARE.TW
//       },
//       template: TEMPLATE.NEW_USER
//     };
//     const sentMail = await send_mail(mail_options);
//     res.status(200).json({
//       message: USER_MESSAGE.CREATED,
//       // mail test
//       // new_user,
//       user: email,
//       sentMail
//     });
//   } catch (error:unknown) {
//     next(error);
//   }
// };
//
// // export const login_fb = async (req:Request, res:Response, next:NextFunction) => {
// //   const {
// //     body: {
// //       email
// //     }
// //   } = req;
// //   try {
// //     const customer = await User.findOne({
// //       email
// //     });
// //     if (customer) {
// //       const customer_info = {
// //         _id: customer.id,
// //         role: customer.role,
// //         email: customer.email
// //       };
// //       const token = jwt.sign({
// //         customer: customer_info
// //       }, process.env.SECRET_KEY, {
// //         expiresIn: TOKEN_EXPIRATION
// //       });
// //       res.status(201).json({
// //         message: 'Ingreso por medio de facebook exitoso',
// //         token,
// //         customer
// //       });
// //     } else {
// //       const new_customer = new User(req.body);
// //       new_customer.socialLogin = true;
// //       new_customer.status = 'Active';
// //       const customer = await new_customer.save();
// //       let customer_info = {
// //         _id: customer.id,
// //         role: customer.isAdmin ? 1 : 0
// //       };
// //       let token = jwt.sign({
// //         customer: customer_info
// //       }, process.env.SECRET_KEY, {
// //         expiresIn: TOKEN_EXPIRATION
// //       });
// //       res.status(201).json({
// //         message: 'Usuario registrado correctamente',
// //         token,
// //         customer
// //       });
// //     }
// //
// //   } catch (error:unknown) {
// //     next(error);
// //   }
// // }
//
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email, password }
  } = req;
  try {
    const query: { email: string } = {
      email
    };
    const user: IUserPopulated | null = await User.findOne(query)
      .populate('status')
      .lean();
    if (!user) {
      res.status(200).json({
        error: USER_MESSAGE.LOGIN_NOTFOUND
      });
    } else if (user) {
      if (user.password && !compareSync(password, user.password)) {
        res.status(200).json({
          error: USER_MESSAGE.LOGIN_WRONGPASS
        });
      } else if (
        user.status.slice(-1)[0] &&
        user.status.slice(-1)[0].status === USER_STATUS.INACTIVE
      ) {
        res.status(200).json({
          error: USER_MESSAGE.NOT_VERIFIED
        });
      } else if (
        user.status.slice(-1)[0] &&
        user.status.slice(-1)[0].status === USER_STATUS.ACTIVE
      ) {
        const user_info = {
          _id: user._id,
          role: user.role,
          email: user.email
        };
        const token = jwt.sign(
          {
            user: user_info
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: TOKEN_EXPIRATION
          }
        );
        res.status(201).json({
          message: USER_MESSAGE.LOGIN_SUCCESS,
          token,
          user
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
//
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email }
  } = req;
  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      res.status(200).json({
        error: USER_MESSAGE.NOT_FOUND
      });
    } else {
      user.reset_password_token = generateToken();
      user.reset_password_expires = Date.now() + FORG_PASS_DURATION;

      const user_updated = await user.save();
      // const hostname = ( req.headers.host.match(/:/g) ) ?
      // req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host
      const expiration_date = user_updated.reset_password_expires;

      const mail_options = {
        to: email,
        subject: 'Restablecer contraseña',
        context: {
          email,
          url: `${process.env.FRONT_URL}/reset_password/${user_updated.reset_password_token}`,
          expiration_date
        },
        template: TEMPLATE.RESET_PASSW
      };
      const sentMail = await send_mail(mail_options);
      res.status(201).json({
        message: USER_MESSAGE.RESET_PASSW,
        user,
        sentMail
      });
    }
  } catch (error) {
    next(error);
  }
};
//
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  try {
    // pasar un objeto con una llave valor undefined
    // regresa un resultado que no tiene esa llave en su modelo
    if (token) {
      const query = {
        reset_password_token: token
      };
      const customer = await User.findOne(query);
      if (!customer) {
        res.status(200).json({
          error: USER_MESSAGE.NOT_FOUND
        });
      } else {
        const { reset_password_expires } = customer;
        const actual_date = Date.now();
        if (reset_password_expires < actual_date) {
          res.status(200).json({
            error: USER_MESSAGE.EXPIRED_TOKEN
          });
        } else {
          res.status(200).json({
            message: USER_MESSAGE.VALID_TOKEN
          });
        }
      }
    } else {
      res.status(200).json({
        error: USER_MESSAGE.NO_TOKEN
      });
    }
  } catch (error) {
    next(error);
  }
};
//
// export const reset_password = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { reset_password_token, new_password } = req.body;
//   const query = {
//     reset_password_token
//   };
//
//   try {
//     const user = await User.findOne(query).select(
//       '-password -verification_code -reset_password_expires -reset_password_token'
//     );
//
//     if (!user) {
//       res.status(200).json({
//         error: USER_MESSAGE.NOT_FOUND
//       });
//     } else {
//       const { reset_password_expires } = user;
//       const actual_date = Date.now();
//       if (reset_password_expires < actual_date) {
//         res.status(200).json({
//           error: USER_MESSAGE.EXPIRED_TOKEN
//         });
//       } else {
//         user.password = setHashSync(new_password, 10);
//         user.reset_password_expires = null;
//         user.reset_password_token = null;
//
//         const user_updated = await user.save();
//         const user_info = {
//           _id: user._id,
//           role: user.role,
//           email: user.email
//         };
//         const token = jwt.sign(
//           {
//             user: user_info
//           },
//           process.env.SECRET_KEY,
//           {
//             expiresIn: TOKEN_EXPIRATION
//           }
//         );
//         res.status(201).json({
//           message: USER_MESSAGE.RESET_PASSW_SUCCESS,
//           user: user_updated,
//           token
//         });
//       }
//     }
//   } catch (error:unknown) {
//     next(error);
//   }
// };
//
// export const change_password = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let _id = null;
//   if (req.user && req.user.role === 0) {
//     _id = req.user._id;
//   } else {
//     _id = req.body._id;
//   }
//
//   try {
//     const { password, new_password } = req.body;
//     // console.log(_id);
//     const customer = await User.findById(_id);
//     if (customer) {
//       // console.log(password === customer.password);
//       if (!compareSync(password, customer.password)) {
//         res.status(400).json({
//           error: 'Contraseña incorrecta'
//         });
//       } else {
//         const query = {
//           $set: {
//             password: setHashSync(new_password),
//             updated_at: Date.now()
//           }
//         };
//         const customer_updated = await User.update(
//           {
//             _id
//           },
//           query
//         );
//         res.status(201).json({
//           message: 'Contraseña restablecida exitosamente',
//           id: customer_updated._id
//         });
//       }
//     } else {
//       res.status(400).json({
//         error: 'No se puede reestablecer, por favor intente otra vez'
//       });
//     }
//   } catch (error:unknown) {
//     next(error);
//   }
// };
//
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, verification_code } = req.body;
    const user = await User.findById(user_id).select('-password');
    if (user) {
      if (user.verification_code === verification_code) {
        const new_status = await new Status({
          status: USER_STATUS.ACTIVE,
          note: SYS_STATUS_NOTE
        }).save();
        user.status = [...user.status, new_status._id];
        user.save();
        const user_info = {
          _id: user._id,
          role: user.role,
          email: user.email
        };
        const token = jwt.sign(
          {
            user: user_info
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: TOKEN_EXPIRATION
          }
        );
        res.status(201).json({
          message: USER_MESSAGE.VALIDATED,
          user,
          token
        });
      } else {
        res.status(200).json({
          error: USER_MESSAGE.FAILED_VALIDATE
        });
      }
    } else {
      res.status(200).json({
        error: USER_MESSAGE.NOT_FOUND
      });
    }
  } catch (error) {
    next({ text: error });
  }
};
//
export const renewToken = async (
  req: Request, // needed to satisfy the load signature of the middleware
  res: Response,
  next: NextFunction
) => {
  const { user } = res.locals;
  try {
    if (user) {
      const userFound: IUser | null = await User.findById(user._id)
        .select('-password')
        .lean();
      if (userFound) {
        const user_info = {
          _id: userFound._id,
          role: userFound.role,
          email: userFound.email
        };
        const token = jwt.sign(
          {
            user: user_info
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: TOKEN_EXPIRATION
          }
        );
        res.status(201).json({
          message: USER_MESSAGE.RENEWED_TOKEN,
          token,
          user: userFound
        });
      } else {
        res.status(200).json({
          error: 'Usuario no encontrado'
        });
      }
    } else {
      res.status(200).json({
        error: 'Token expirado'
      });
    }
  } catch (error) {
    // console.warn('error', error);
    next(error);
  }
};
