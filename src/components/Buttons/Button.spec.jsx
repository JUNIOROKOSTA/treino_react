import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('<Button />', () => {
  it('Should render the button with the text "Click Next"', () => {
    render(<Button text="Click Next" />);
    expect.assertions(2);
    const btn = screen.getByRole('button', { name: /click next/i });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('class', 'button-next');
  });

  it('Should call one function on click button', () => {
    // cria um função de mock para auxiliar o teste.
    const func = jest.fn();

    render(<Button text="Click Next" eventClick={func} />);

    const button = screen.getByRole('button', { name: /click next/i });

    // gera um evento de click no elemento/componente.
    userEvent.click(button);

    // verifica se foi clicado.
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('Should be disabled when disabled is true', () => {
    render(<Button text="Click Next" disabled={true} />);

    const button = screen.getByRole('button', { name: /click next/i });

    expect(button).toBeDisabled();
  });
});
