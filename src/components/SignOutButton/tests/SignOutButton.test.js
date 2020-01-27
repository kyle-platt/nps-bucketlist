import React from 'react';
import renderer from 'react-test-renderer';
import { SignOutButtonTest } from '../SignOutButton';

describe('SignOutButton Tests', () => {
    it('renders with some data', () => {
        const props = {
            firebase: {
                doSignOut: () => {},
            }
        };
        const tree = renderer.create(
            <SignOutButtonTest {...props} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
