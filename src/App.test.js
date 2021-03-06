import { render, screen } from '@testing-library/react';
import SocialApp from "./App";
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  render(<SocialApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders without crashing', () =>{
  const div = document.createElement('div');
  ReactDOM.render(<SocialApp />,div);
  ReactDOM.unmountComponentAtNode(div);
})