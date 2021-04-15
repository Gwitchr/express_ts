import { Response, Request, NextFunction } from 'express';
import { Brand, Status, Category } from '../models';
import { BRAND_MESSAGES } from '../constants/messages';
import { STATUS_BRAND } from '../constants/status';

export const listBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    query: { search, category, attributes, search_text }
  } = req;
  let query = {};
  if (search) {
    if (attributes) {
      query = {
        ...query,
        attributes: {
          $in:
            typeof attributes === 'string' ? attributes.split(',') : attributes
        }
      };
    }
    if (category) {
      query = { ...query, categories: category };
    }
    if (search_text && typeof search_text === 'string') {
      query = {
        ...query,
        $or: [
          {
            handle: {
              $regex: new RegExp(search_text.trim(), 'i')
            }
          },
          {
            'description.es': new RegExp(search_text.trim(), 'i')
          },
          {
            'description.en': new RegExp(search_text.trim(), 'i')
          },
          {
            'name.es': new RegExp(search_text.trim(), 'i')
          },
          {
            'name.en': new RegExp(search_text.trim(), 'i')
          }
          // {
          //   tags: {
          //     $regex: new RegExp(search_text.trim(), 'i')
          //   }
          // }
        ]
      };
    }
  }
  try {
    const brands = await Brand.find(query)
      .sort({ show_priority: 1 })
      .populate('categories');
    return res.status(200).json({
      message: brands.length ? BRAND_MESSAGES.FOUND : BRAND_MESSAGES.NOT_FOUND,
      brands
    });
  } catch (error) {
    next(error);
  }
};

export const getOneBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { brand_id }
  } = req;
  try {
    const brand = await Brand.findById(brand_id);
    res.status(200).json({
      message: BRAND_MESSAGES.FOUND_ONE,
      brand
    });
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body,
    body: { add_categories }
  }: { body: { add_categories: string[]; categories: string[] } } = req;
  const {
    user: { _id }
  } = res.locals;

  try {
    let new_brand_body = { ...body };

    const new_status = await new Status({
      status: STATUS_BRAND.CREATED,
      added_by: _id
    }).save();

    if (add_categories && add_categories.length) {
      new_brand_body.categories = [];

      add_categories.forEach(async (categ: string) => {
        const cat = await Category.findOneAndUpdate(
          { 'name.es': categ },
          { name: { es: categ } },
          { upsert: true, new: true }
        );
        new_brand_body.categories = [...new_brand_body.categories, cat._id];
      });
    }

    const new_brand = await new Brand({
      ...new_brand_body,
      status: [new_status._id]
    }).save();

    return res.status(201).json({
      message: BRAND_MESSAGES.CREATED,
      brand: new_brand
    });
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { brand_id },
    body
  } = req;
  const {
    user: { _id }
  } = res.locals;

  try {
    const new_status = await new Status({
      status: STATUS_BRAND.UPDATED,
      added_by: _id
    }).save();

    const updated_brand = await Brand.findByIdAndUpdate(
      brand_id,
      {
        ...body,
        $push: { status: new_status._id }
      },
      { new: true }
    );

    res.status(200).json({
      message: BRAND_MESSAGES.UPDATED,
      brand: updated_brand
    });
  } catch (error) {
    next(error);
  }
};

// export const add_status_custom_gallery = async (req:Request, res:Response, next:NextFunction) => {};
