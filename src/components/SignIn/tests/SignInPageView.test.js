import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SignInPageView from '../SignInPageView';

describe('SignInPageView', () => {
  it('renders with some data', () => {
    const tree = renderer.create(
      <BrowserRouter>
          <SignInPageView
          email={'info@test.com'}
          error={null}
          handleChange={() => {}}
          handleSubmit={() => {}}
          isInvalid={false}
          password={'123abc'}
          />
      </BrowserRouter> 
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders with an error', () => {
      const tree = renderer.create(
      <BrowserRouter>
        <SignInPageView
        email={'info@test.com'}
        error={{ message: 'some error' }}
        handleChange={() => {}}
        handleSubmit={() => {}}
        isInvalid={true}
        password={'123abc'}
        />
      </BrowserRouter>
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
