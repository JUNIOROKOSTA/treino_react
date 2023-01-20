import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should call handleChange exist', () => {
    const func = jest.fn();
    render(<TextInput handleSearch={func} searchPosts={'Testando'} />);

    // expect(screen.getByPlaceholderText('Buscar por titulo'))
    // .toBeInTheDocument();

    expect(screen.getByPlaceholderText('Buscar por titulo')).toHaveDisplayValue(/testando/i);
  });

  it('should call handleChange function', () => {
    const func = jest.fn();
    render(<TextInput handleSearch={func} />);

    const input = screen.getByPlaceholderText('Buscar por titulo');
    const newValue = 'New value';
    const expectedValue = 'New value';

    userEvent.type(input, newValue);

    // checks if the value is the expected.
    expect(input.value).toBe(expectedValue);

    // checks if the function was called
    // in the same amount of characters expected.
    expect(func).toHaveBeenCalledTimes(expectedValue.length);
  });

  it('should match snapshot', () => {
    const func = jest.fn();
    const { container } = render(<TextInput handleSearch={func} />);

    expect(container).toMatchSnapshot();
  });
});
