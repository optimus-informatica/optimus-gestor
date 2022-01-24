import {
  user,
  rules,
  state,
  role,
  profileRequest,
  profileResponse,
  http,
} from './defaults';

test('GET /api/test', () => {
  return http()
    .get('/api/test')
    .then(response => expect(response.data).toEqual({ test: true }));
});

test('Get default rules', () => {
  expect(rules()).toStrictEqual({
    user: [],
    client: [],
    product: [],
    service: [],
    order: [],
  });
});

test('Get default user', () => {
  expect(user()).toStrictEqual({
    id: 0,
    name: '',
    username: '',
    email: '',
    role_id: 0,
    nivel: 100,
    rules: rules(),
    created_at: '',
    updated_at: '',
  });
});

test('Get default state', () => {
  expect(state()).toStrictEqual({
    sidebar: false,
    title: 'Home',
    user: user(),
  });
});

test('Get default role', () => {
  expect(role()).toStrictEqual({
    id: 0,
    name: '',
    nivel: 100,
    rules: rules(),
  });
});

test('Get default profile request', () => {
  expect(profileRequest(user())).toStrictEqual({
    name: '',
    username: '',
    email: '',
    role_id: 0,
    nivel: 100,
    rules: rules(),
  });
});

test('Get default profile response', () => {
  expect(profileResponse()).toStrictEqual({
    message: ' ',
    errors: {},
  });
});
