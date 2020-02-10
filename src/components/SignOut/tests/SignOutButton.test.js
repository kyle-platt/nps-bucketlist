import React from 'react';
import renderer from 'react-test-renderer';
import { SignOutButtonTest } from '../SignOutButton';

describe('SignOutButton Tests', () => {
    const defaultProps = {
        firebase: {
            doSignOut: () => {}
        }
    };

    it('renders with some data', () => {
        const tree = renderer
            .create(<SignOutButtonTest {...defaultProps} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
