import Share from "../models/Share.js";
import { createError } from "../utils/error.js";

export const createShare = async (req, res, next) => {
  const newShare = new Share(req.body);
  try {
    const savedShare = await newShare.save();
    res.status(200).json(savedShare);
  } catch (error) {
    next(error);
  }
};

export const updateShare = async (req, res, next) => {
  try {
    const share = await Share.findById(req.params.id);
    if (share.username === req.body.username) {
      try {
        const updatedShare = await Share.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedShare);
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(401, "You can update only your post"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteShare = async (req, res, next) => {
  try {
    const share = await Share.findById(req.params.id);
    if (share.username === req.body.username) {
      try {
        await Share.findByIdAndDelete(req.params.id);
        res.status(200).json("Your post deleted");
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(401, "You can delete only your post"));
    }
  } catch (error) {
    next(error);
  }
};

export const getShare = async (req, res, next) => {
  try {
    const share = await Share.findById(req.params.id);
    res.status(200).json(share);
  } catch (error) {
    next(error);
  }
};

export const getShares = async (req, res, next) => {
  try {
    const shares = await Share.find();
    res.status(200).json(shares);
  } catch (error) {
    next(error);
  }
};
