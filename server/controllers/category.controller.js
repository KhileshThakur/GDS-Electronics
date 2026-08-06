import Category from "../models/Category.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";
import generateSlug from "../utils/slug.js";
import { validateRequiredFields } from "../utils/validation.js";
import { STATUS } from "../constants/constants.js";

export const createCategory = asyncHandler(async (req, res) => {
    let {
        name,
        description,
        sortOrder
    } = req.body;

    const error = validateRequiredFields({
        name
    });

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    name = name.trim();
    const slug = generateSlug(name);

    const existingCategory = await Category.findOne({
        $or: [
            { name },
            { slug }
        ]
    });

    if (existingCategory) {
        return sendResponse(
            res,
            409,
            false,
            "Category already exists"
        );
    }

    const category = await Category.create({
        name,
        slug,
        description: description?.trim() || "",
        sortOrder: sortOrder || 0
    });

    return sendResponse(
        res,
        201,
        true,
        "Category created successfully",
        category
    );
});

export const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find({
        status: STATUS.ACTIVE
    })
        .sort({
            sortOrder: 1,
            createdAt: -1
        });

    return sendResponse(
        res,
        200,
        true,
        "Categories fetched successfully",
        categories
    );

});

export const getCategory = asyncHandler(async (req, res) => {

    const { slug } = req.params;

    const category = await Category.findOne({
        slug,
        status: STATUS.ACTIVE
    });

    if (!category) {

        return sendResponse(
            res,
            404,
            false,
            "Category not found"
        );

    }

    return sendResponse(
        res,
        200,
        true,
        "Category fetched successfully",
        category
    );

});

export const updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    let {
        name,
        description,
        sortOrder,
        status
    } = req.body;

    const category = await Category.findById(id);

    if (!category) {

        return sendResponse(
            res,
            404,
            false,
            "Category not found"
        );

    }

    if (name) {
        name = name.trim();
        const slug = generateSlug(name);

        const existingCategory = await Category.findOne({
            _id: { $ne: id },
            $or: [
                { name },
                { slug }
            ]
        });

        if (existingCategory) {
            return sendResponse(
                res,
                409,
                false,
                "Category already exists"
            );
        }

        category.name = name;
        category.slug = slug;

    }

    if (description !== undefined) {
        category.description = description.trim();
    }

    if (sortOrder !== undefined) {
        category.sortOrder = sortOrder;
    }

    if (status) {
        category.status = status;
    }

    await category.save();

    return sendResponse(
        res,
        200,
        true,
        "Category updated successfully",
        category
    );

});

export const deleteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return sendResponse(
            res,
            404,
            false,
            "Category not found"
        );
    }

    await category.deleteOne();

    return sendResponse(
        res,
        200,
        true,
        "Category deleted successfully"
    );
});