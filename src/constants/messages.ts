export enum BRAND_MESSAGES {
  FOUND = 'Marcas encontradas',
  NOT_FOUND = 'Marca no encontrada',
  FOUND_ONE = 'Marca encontrada',
  CREATED = 'Marca creada',
  UPDATED = 'Marca actualizada'
}

export const USER_MESSAGE = {
  CREATED: {
    es: '¡Listo! por favor revise su correo para activar su cuenta.',
    en: 'User created, please check your email to activate your account'
  },
  FOUND: {
    es: 'Clientes encontrados',
    en: 'Clients found'
  },
  DUPLICATE: {
    es: 'El correo ya está registrado con otro cliente',
    en: 'The mail is already registered'
  },
  UPDATED: {
    es: 'Usuario actualizado',
    en: 'User updated'
  },
  VALIDATED: {
    es: 'Usuario validado correctamente',
    en: 'User validated'
  },
  FAILED_VALIDATE: {
    es: 'Validación de código fallida',
    en: 'Validation failed'
  },
  NOT_FOUND: {
    es: 'Usuario no encontrado',
    en: 'User not found'
  },
  LOGIN_NOTFOUND: {
    es: 'El ingreso falló, el usuario no fue encontrado',
    en: 'Login failed, user not found'
  },
  LOGIN_WRONGPASS: {
    es: 'El ingreso falló. Password incorrecto',
    en: "Login failed, password doesn't match"
  },
  NOT_VERIFIED: {
    es:
      'Tu cuenta no ha sido verificada. Por favor revise su correo, incluida su bandeja de spam.',
    en: "Your account hasn't been verified, please check your email"
  },
  LOGIN_SUCCESS: {
    es: 'Ingreso al sistema exitoso',
    en: 'Login successful'
  },
  RESET_PASSW_SUCCESS: {
    es: 'Contraseña reestablecida',
    en: 'Password reset'
  },
  RENEWED_TOKEN: {
    es: 'Reingreso exitoso',
    en: 'Session renewed'
  },
  EXPIRED_TOKEN: {
    es: 'Token expirado',
    en: 'Expired Token'
  },
  VALID_TOKEN: {
    es: 'Token válido',
    en: 'Valid Token'
  },
  NO_TOKEN: {
    es: 'No hay un código que verificar',
    en: 'No code to verify'
  },
  RESET_PASSW: {
    es: 'Revise su correo para reestablecer la contraseña',
    en: 'Check your email to reset password'
  },
  ADDRESS_ADDED: {
    es: 'Domicilio añadido',
    en: 'Address added'
  }
};
