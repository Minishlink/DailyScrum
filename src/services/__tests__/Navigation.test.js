import { getRouteNamesFromState } from '../Navigation';

describe('Navigation service', () => {
  it('gets the route names from the navigation state', () => {
    expect(
      getRouteNamesFromState({
        index: 0,
        routes: [
          {
            type: 'Navigation/NAVIGATE',
            routeName: 'main',
            routes: [
              { routes: [{ key: 'summary', routeName: 'summary' }], index: 0, key: 'project', routeName: 'project' },
              { routes: [{ key: 'summary', routeName: 'summary' }], index: 0, key: 'sprint', routeName: 'sprint' },
              {
                routes: [
                  { key: 'yesterday', routeName: 'yesterday' },
                  { key: 'summary', routeName: 'summary' },
                  { key: 'today', routeName: 'today' },
                ],
                index: 1,
                key: 'daily',
                routeName: 'daily',
              },
            ],
            index: 2,
            key: 'Init0',
          },
        ],
      })
    ).toEqual(['main', 'daily', 'summary']);
    expect(
      getRouteNamesFromState({
        index: 0,
        routes: [
          {
            type: 'Navigation/NAVIGATE',
            routeName: 'main',
            routes: [
              { routes: [{ key: 'summary', routeName: 'summary' }], index: 0, key: 'project', routeName: 'project' },
              { routes: [{ key: 'summary', routeName: 'summary' }], index: 0, key: 'sprint', routeName: 'sprint' },
              {
                routes: [
                  { key: 'yesterday', routeName: 'yesterday' },
                  { key: 'summary', routeName: 'summary' },
                  { key: 'today', routeName: 'today' },
                ],
                index: 2,
                key: 'daily',
                routeName: 'daily',
              },
            ],
            index: 2,
            key: 'Init0',
          },
        ],
      })
    ).toEqual(['main', 'daily', 'today']);
    expect(
      getRouteNamesFromState({
        routes: [
          { key: 'yesterday', routeName: 'yesterday' },
          { key: 'summary', routeName: 'summary' },
          { key: 'today', routeName: 'today' },
        ],
        index: 0,
        key: 'daily',
        routeName: 'daily',
      })
    ).toEqual(['daily', 'yesterday']);
  });
});
