import adapt from '../CardsTrelloToAppAdapter';

describe('CardsTrelloToAppAdapter', () => {
  const testCards = [
    {
      id: 'macro',
      idShort: 1,
      name: 'Macro [20]',
      idMembers: ['foo'],
      dateLastActivity: 1495133134992,
      actions: [],
      shortUrl: 'link',
    },
    {
      id: 'story',
      idShort: 2,
      name: '(3) User story',
      idMembers: ['foo'],
      dateLastActivity: 1495133134992,
      actions: [],
      shortUrl: 'link',
    },
    {
      id: 'unassignedStory',
      idShort: 3,
      name: '(1) Unassigned story',
      idMembers: [],
      dateLastActivity: 1495133134992,
      actions: [],
      shortUrl: 'link',
    },
    {
      id: 'oldStory',
      idShort: 4,
      idMembers: ['bar'],
      name: 'Old story (5)',
      dateLastActivity: 1494960334992,
      actions: [
        {
          data: {
            listAfter: {
              id: 'done',
            },
          },
          date: 1494960334992,
        },
        {
          data: {
            listAfter: {
              id: 'toValidate',
            },
          },
          date: 1494930334992,
        },
      ],
      shortUrl: 'link',
    },
  ];

  const expectedTestCards = [
    {
      id: 'macro',
      idShort: 1,
      idMembers: ['foo'],
      name: 'Macro',
      points: null,
      postPoints: 20,
      dateLastActivity: 1495133134992,
      dateEndDevelopment: null,
      url: 'link',
    },
    {
      id: 'story',
      idShort: 2,
      idMembers: ['foo'],
      name: 'User story',
      points: 3,
      postPoints: null,
      dateLastActivity: 1495133134992,
      dateEndDevelopment: null,
      url: 'link',
    },
    {
      id: 'unassignedStory',
      idShort: 3,
      name: 'Unassigned story',
      points: 1,
      postPoints: null,
      idMembers: [],
      dateLastActivity: 1495133134992,
      dateEndDevelopment: null,
      url: 'link',
    },
    {
      id: 'oldStory',
      idShort: 4,
      idMembers: ['bar'],
      name: 'Old story',
      points: 5,
      postPoints: null,
      dateLastActivity: 1494960334992,
      dateEndDevelopment: 1494930334992,
      url: 'link',
    },
  ];

  it('should adapt the cards', () => {
    expect(adapt(testCards, 'toValidate')).toEqual(expectedTestCards);
  });
});
