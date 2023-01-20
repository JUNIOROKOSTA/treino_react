import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
  posts: [
    {
      title: 'Title 1',
      body: 'Body 1',
      id: 1,
      cover: 'img/img1.png',
    },
    {
      title: 'Title 2',
      body: 'Body 2',
      id: 2,
      cover: 'img/img2.png',
    },
    {
      title: 'Title 3',
      body: 'Body 3',
      id: 3,
      cover: 'img/img3.png',
    },
  ],
};

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);

    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);

    expect(screen.getAllByText(/body/i)).toHaveLength(3);

    expect(screen.getByRole('img', { name: /title 1/i })).toHaveAttribute('src', 'img/img1.png');
  });

  // Create snapshot of test

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
