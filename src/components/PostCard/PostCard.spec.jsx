const { render, screen } = require('@testing-library/react');
const { PostCard } = require('.');
const { postCardPropsMock } = require('./mock');

const props = postCardPropsMock;

describe('<PostCard>', () => {
  it('Should render PostCard correctly', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();

    expect(screen.getByText('Body 1')).toBeInTheDocument();
  });
});
