import 'react-native';
import React from 'react';
import TrelloCard from '../TrelloCard';
import renderer from 'react-test-renderer';

describe('<TrelloCard />', () => {
  let card = {};

  beforeEach(() => {
    card = {
      id: 40,
      idShort: 40,
      name: 'AAU, I do this',
      members: [],
      url: 'https://trello.com',
    };
  });

  const members = [{ id: 1, initials: 'FB', avatarHash: 'foobar' }, { id: 2, initials: 'LL' }];
  const points = 3;
  const postPoints = 2;

  it('renders correctly with only the required props', () => {
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with points', () => {
    card.points = points;
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with post-estimated points', () => {
    card.postPoints = postPoints;
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with both points and post-estimated points', () => {
    card.points = points;
    card.postPoints = postPoints;
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with members', () => {
    card.members = members;
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with members and points', () => {
    card.members = members;
    card.points = points;
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when the card is not late for validation', () => {
    card.dateEndDevelopment = new Date('2017-11-13T10:45:00.000Z').getTime();
    Date.now = jest.fn(() => new Date('2017-11-14T09:00:00.000Z').getTime());
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when the card was not late for validation', () => {
    card.dateEndDevelopment = new Date('2017-11-13T10:45:00.000Z').getTime();
    card.dateDone = new Date('2017-11-14T09:00:00.000Z').getTime();
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when the card is late for validation', () => {
    card.dateEndDevelopment = new Date('2017-11-13T10:45:00.000Z').getTime();
    Date.now = jest.fn(() => new Date('2017-11-14T10:30:01.000Z').getTime());
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when the card was late for validation', () => {
    card.dateEndDevelopment = new Date('2017-11-13T10:45:00.000Z').getTime();
    card.dateDone = new Date('2017-11-14T10:30:01.000Z').getTime();
    const tree = renderer.create(<TrelloCard card={card} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
