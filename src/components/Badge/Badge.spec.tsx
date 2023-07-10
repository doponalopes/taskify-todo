import { render } from '@testing-library/react';

import { Badge } from './index';

describe('Badge', () => {
  test('Deve renderizar o componente com os estilos corretos', () => {

    const { getByText } = render(<Badge color="green">Badge green</Badge>);

    const badgeElement = getByText('Badge green');

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveStyle('background-color: green.200');
    expect(badgeElement).toHaveStyle('color: green.500');
  });
});