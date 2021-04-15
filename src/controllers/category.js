import { Category } from "../models";
import { CATEGORY_MESSAGE } from "../constants/messages";
import { cleanText } from "../utils";

export const list_categories = async (req, res, next) => {
  const {
    params: { search, search_text }
  } = req;
  let query = {};
  if (search) {
    if (search_text) {
      const clean_search_text = cleanText(search_text);
      query = {
        ...query,
        $or: [
          {
            name: {
              es: { $regex: new RegExp(clean_search_text.trim(), "i") },
              en: { $regex: new RegExp(clean_search_text.trim(), "i") },
              nah: { $regex: new RegExp(clean_search_text.trim(), "i") }
            }
          },
          {
            description: {
              es: { $regex: new RegExp(clean_search_text.trim(), "i") },
              en: { $regex: new RegExp(clean_search_text.trim(), "i") },
              nah: { $regex: new RegExp(clean_search_text.trim(), "i") }
            }
          }
        ]
      };
    }
    try {
      const found_categories = await Category.find(query).lean();
      res.status(200).json({
        categories: found_categories,
        message: found_categories.length
          ? CATEGORY_MESSAGE.FOUND
          : CATEGORY_MESSAGE.NOT_FOUND
      });
    } catch (error) {
      next(error);
    }
  }
};

export const get_one_category = async (req, res, next) => {
  const {
    params: { category_id }
  } = req;
  try {
    const found_category = await Category.findById(category_id);
    res.status(200).json({
      message: CATEGORY_MESSAGE.FOUND_ONE,
      category: found_category
    });
  } catch (error) {
    next(error);
  }
};
export const create_category = async (req, res, next) => {
  const { body } = req;
  try {
    const new_category = await new Category(body).save();
    res.status(201).json({
      message: CATEGORY_MESSAGE.CREATED,
      category: new_category
    });
  } catch (error) {
    next(error);
  }
};
export const update_category = async (req, res, next) => {
  const {
    body,
    params: { category_id }
  } = req;
  try {
    const updated_category = await Category.findByIdAndUpdate(
      category_id,
      { ...body },
      { new: true }
    );
    res.status(200).json({
      category: updated_category,
      message: CATEGORY_MESSAGE.UPDATED
    });
  } catch (error) {
    next(error);
  }
};
