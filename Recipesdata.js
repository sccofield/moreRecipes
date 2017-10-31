const recipes = [
  {
    id: 1,
    author: 'Michael',
    title: 'Tomato Stew',
    created: 1508833829,
    ingredients: ['tomato', 'pepper', 'onions', 'rice'],
    description: 'lorem ispum lorem ispum lorem ispum loremispum',
    votes: 23,
    reviews: [
      {
        user: 'john',
        created: 1508833829,
        review: 'nice recipe'
      },
      {
        user: 'Seun',
        created: 1508833859,
        content: 'beautiful recipe. will definately try this one.'
      }
    ],

  },

  {
    id: 2,
    author: 'Cynthis',
    title: 'Spagethi meat balls',
    created: 1508833829,
    ingredients: ['tomato', 'pepper', 'onions', 'rice'],
    description: 'lorem ispum lorem ispum lorem ispum loremispum',
    votes: 5,
    reviews: [
      {
        user: 'mike',
        created: 1508833829,
        comment: 'nice recipe'
      },
    ],

  },

  {
    id: 3,
    author: 'Bayo',
    title: 'Afang',
    created: 1508833829,
    ingredients: ['afang', 'waterleave', 'onions'],
    description: 'lorem ispum lorem ispum lorem ispum loremispum',
    votes: 12,
    reviews: [
      {
        user: 'Nkoyo',
        created: 1508833839,
        content: 'wow nice soup.'
      },
      {
        user: 'Seun',
        created: 1508833859,
        content: 'beautiful recipe.'
      }
    ],

  }
];

export default recipes;
