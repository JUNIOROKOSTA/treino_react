import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from '.';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'titulo 1',
          body: 'titulo 1 , body 1',
        },
        {
          userId: 1,
          id: 3,
          title: 'titulo 3',
          body: 'titulo 3 , body 3',
        },
        {
          userId: 1,
          id: 2,
          title: 'titulo 2',
          body: 'titulo 2 , body 2',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.jpg',
        },
        {
          url: 'img2.jpg',
        },
        {
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Resultado não encontrado');

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Buscar por titulo/i);
    expect(search).toBeInTheDocument();

    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(3);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    expect.assertions(3);
  });

  it('should render was searching', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Resultado não encontrado');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Buscar por titulo/i);
    expect(screen.getAllByRole('img')).toHaveLength(3);

    userEvent.type(search, 'titulo 1');
    expect(screen.queryByRole('img', { name: /titulo/i })).toBeInTheDocument();

    userEvent.clear(search);
    userEvent.type(search, 'Não existe esse elemento');
    expect(screen.getByText('Resultado não encontrado')).toBeInTheDocument();

    expect.assertions(3);
  });
});
