import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SignInPageView from '../SignInPageView';

describe('SignInPageView', () => {
  const defaultProps = {
    email: 'info@test.com',
    error: null,
    handleChange: () => {},
    handleSubmit: () => {},
    isInvalid: false,
    password: '123abc',
  };

  it('renders with some data', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <SignInPageView
          {...defaultProps}
        />
      </BrowserRouter> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders with an error', () => {
      const tree = renderer.create(
        <BrowserRouter>
          <SignInPageView
            {...defaultProps}
            error={{ message: 'some error' }}
          />
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
