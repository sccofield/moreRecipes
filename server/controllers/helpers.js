import db from '../models';


export const searchRecipes = (req, res, search) => db.Recipe.findAndCountAll({
  where: {
    $or: [
      { title: { $ilike: `%${search}%` } },
      { ingredients: { $ilike: `%${search}%` } }
    ],
  }
})
  .then((all) => {
    const limit = 6;
    let offset = 0;
    const page = parseInt((req.query.page || 1), 10);
    const numberOfItems = all.count;
    const pages = Math.ceil(numberOfItems / limit);
    offset = limit * (page - 1);
    db.Recipe.findAll({
      where: {
        $or: [
          { title: { $ilike: `%${search}%` } },
          { ingredients: { $ilike: `%${search}%` } }
        ],
      },
      include: [
        {
          model: db.Review,
        },
        {
          model: db.Favorite,
          attributes: ['userId', 'recipeId']
        },
        {
          model: db.Upvote,
          attributes: ['userId', 'recipeId']
        },
        {
          model: db.Downvote,
          attributes: ['userId', 'recipeId']
        }
      ],
      limit,
      offset,
      order: [
        ['id', 'ASC']
      ],
    })
      .then((foundRecipe) => {
        if (foundRecipe.length < 1) {
          return res.status(200)
            .json({
              status: 'success',
              recipes: foundRecipe
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            numberOfItems,
            pages,
            currentPage: page,
            limit,
            recipes: foundRecipe
          });
      });
  })
  .catch(() => res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  }));

export const sortSearch = (req, res) => {
  db.Recipe.findAll({
    order: [['votes', 'DESC']],
    include: [{
      model: db.Review
    },
    {
      model: db.Favorite,
      attributes: ['userId', 'recipeId']
    },
    {
      model: db.Upvote,
      attributes: ['userId', 'recipeId']
    },
    {
      model: db.Downvote,
      attributes: ['userId', 'recipeId']
    }
    ]
  })
    .then((recipes) => {
      res.status(200).json({
        status: 'success',
        recipes,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        message: error
      });
    });
};

export const checkId = (req, res, id) => {
  if (Number.isNaN(parseInt(id, 10))) {
    return res.status(400).json({
      status: 'Error',
      message: 'id must be a number.'
    });
  }
};

