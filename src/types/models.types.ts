import { Document } from 'mongoose';
import { IMultiLang } from './utils';

// in general types are not extensible, where interfaces are.

export interface IUser extends Document {
  isAdmin: boolean;
  password: string | null;
  role: number;
  firstname: string;
  lastname: string;
  profile_image: string;
  title: string;
  telephone: string;
  extension: string;
  email: string;
  addresses: string[];
  status: string[] | IStatus[];
  verification_code: string | null;
  reset_password_token: string;
  reset_password_expires: number;
}

export interface IUserPopulated extends IUser {
  status: IStatus[];
}

export interface IStatus extends Document {
  added_by: string;
  note?: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: string;
}

export interface ICategory extends Document {
  name: IMultiLang;
  description: IMultiLang;
}
export interface INote extends Document {
  added_by: string;
  title: string;
  note: string;
}

interface BrandResource {
  name: IMultiLang;
  description: IMultiLang;
  asset: string;
  metadata: {};
}

export interface IBrand extends Document {
  guides: BrandResource[];
  resources: BrandResource[];
  name: IMultiLang;
  description: IMultiLang;
  handle: string;
  logo_img: string;
  color_array: string;
  categories: string[] | ICategory[];
  metadata: {};
  external_links: any;
  tags: string[];
  attributes: string[];
  active: boolean;
  notes: string[] | INote[];
}
