const Post = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const addPost = async (req, res) => {
  let sentPost = req.body;
  const dateFields = sentPost.endDate.split('/');

  const day = parseInt(dateFields[0]);
  const month = parseInt(dateFields[1]) - 1;
  const year = parseInt(dateFields[2]);

  sentPost.endDate = new Date(year, month, day);

  try {
    const userExists = await User.findById(sentPost.user);
    if (userExists === null || userExists.typeOfUser !== 'POSLODAVAC') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Vi ne mozete kreirati novi post!' });
    }
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Problem sa korisnikom' });
  }

  const post = await Post.create(sentPost);

  const { ...returnObject } = post._doc;
  delete returnObject.__v;
  res.status(StatusCodes.CREATED).json(returnObject);
};

const getPosts = async (req, res) => {
  const { location, company, position } = req.params;

  let filters = {};
  const now = new Date();
  
  if (location && location !== 'null') {
    filters.location = { $regex: new RegExp(location, 'i') };
  }

  if (company && company !== 'null') {
    filters.company = { $regex: new RegExp(company, 'i') };
  }

  if (position && position !== 'null') {
    filters.position = { $regex: new RegExp(position, 'i') };
  }

  filters.endDate = { $gt: now };

  const foundPosts = await Post.find(filters);

  const returnPosts = foundPosts.map(post => {
    const { __v, ...restOfTheObject } = post;
    const postsWithoutV = restOfTheObject._doc;
    delete postsWithoutV.__v;

    const endDate = new Date(postsWithoutV.endDate);
    const currentDate = new Date();

    var diffInDays = (endDate - currentDate) / (1000 * 3600 * 24);

    if (diffInDays < 30) {
      const returnStringDays =
        diffInDays == 1 ? `${diffInDays} dan` : `${diffInDays} dana`;
      postsWithoutV.endDate = returnStringDays;
    } else {
      const months = diffInDays / 30;
      const days = diffInDays % 30;
      const returnStringMonths =
        months.toFixed(0) == 1
          ? `${months.toFixed(0)} mjesec`
          : `${months.toFixed(0)} mjeseci`;
      const returnStringDays =
        days.toFixed(0) == 1
          ? `${days.toFixed(0)} dan`
          : `${days.toFixed(0)} dana`;
      postsWithoutV.endDate = `${returnStringMonths} ${returnStringDays}`;
    }
    return postsWithoutV;
  });

  res.status(StatusCodes.OK).json(returnPosts);
};

const getPost = async (req, res) => {
  const postId = req.params.postId;
  const now = new Date();
  const foundPost = await Post.find({ id: postId, endDate: { $gt: now } });
  const { ...returnObject } = foundPost._doc;
  delete returnObject.__v;

  const endDate = new Date(returnObject.endDate);
  const currentDate = new Date();

  var diffInDays = (endDate - currentDate) / (1000 * 3600 * 24);

  if (diffInDays < 30) {
    const returnStringDays =
      diffInDays == 1 ? `${diffInDays} dan` : `${diffInDays} dana`;
    returnObject.endDate = returnStringDays;
  } else {
    const months = diffInDays / 30;
    const days = diffInDays % 30;
    const returnStringMonths =
      months.toFixed(0) == 1
        ? `${months.toFixed(0)} mjesec`
        : `${months.toFixed(0)} mjeseci`;
    const returnStringDays =
      days.toFixed(0) == 1
        ? `${days.toFixed(0)} dan`
        : `${days.toFixed(0)} dana`;
    returnObject.endDate = `${returnStringMonths} ${returnStringDays}`;
  }

  res.status(StatusCodes.OK).json(returnObject);
};

const getMyPosts = async (req, res) => {
  const userId = req.params.userId;
  const now = new Date();
  const foundedPosts = await Post.find({ user: userId, endDate: { $gt: now } });

  const returnPosts = foundedPosts.map(post => {
    const { __v, ...restOfTheObject } = post;
    const postsWithoutV = restOfTheObject._doc;
    delete postsWithoutV.__v;

    const endDate = new Date(postsWithoutV.endDate);
    const currentDate = new Date();

    var diffInDays = (endDate - currentDate) / (1000 * 3600 * 24);

    if (diffInDays < 30) {
      const returnStringDays =
        diffInDays == 1 ? `${diffInDays} dan` : `${diffInDays} dana`;
      postsWithoutV.endDate = returnStringDays;
    } else {
      const months = diffInDays / 30;
      const days = diffInDays % 30;
      const returnStringMonths =
        months.toFixed(0) == 1
          ? `${months.toFixed(0)} mjesec`
          : `${months.toFixed(0)} mjeseci`;
      const returnStringDays =
        days.toFixed(0) == 1
          ? `${days.toFixed(0)} dan`
          : `${days.toFixed(0)} dana`;
      postsWithoutV.endDate = `${returnStringMonths} ${returnStringDays}`;
    }
    return postsWithoutV;
  });

  res.status(StatusCodes.OK).json(returnPosts);
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;

  await Post.findByIdAndDelete({ _id: postId });

  res.status(StatusCodes.OK).json(true);
};

module.exports = { addPost, getPosts, getPost, getMyPosts, deletePost };
