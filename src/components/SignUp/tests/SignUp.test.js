import React from 'react';
import {
	cleanup,
	fireEvent,
	render,
	wait,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { SignUpTest } from '../SignUp';
import * as ROUTES from '../../../constants/routes';

afterEach(cleanup);

describe('SignUp Tests', () => {
	it('sign-up is successful and the user is sent to the dashboard', async () => {
		const props = {
			firebase: {
				doCreateUserWithEmailAndPassword: jest.fn().mockResolvedValue(),
			},
			history: {
				push: jest.fn(),
			},
		};

		const history = createMemoryHistory();
		const { getByText, getByPlaceholderText } = render(
			<Router history={history}>
				<SignUpTest {...props} />
			</Router>
		);

		const emailInput = getByPlaceholderText('Email Address');
		expect(emailInput.value).toBe('');
		fireEvent.change(emailInput, { target: { value: 'info@test.com' } });
		expect(emailInput.value).toBe('info@test.com');

		const passwordInput = getByPlaceholderText('Password');
		expect(passwordInput.value).toBe('');
		fireEvent.change(passwordInput, { target: { value: 'abc123' } });
		expect(passwordInput.value).toBe('abc123');

		const confirmPasswordInput = getByPlaceholderText('Confirm Password');
		expect(confirmPasswordInput.value).toBe('');
		fireEvent.change(confirmPasswordInput, { target: { value: 'abc123' } });
		expect(confirmPasswordInput.value).toBe('abc123');

		const signUpButton = getByText('Sign Up');
		fireEvent.click(signUpButton);
		await wait(() => {
			expect(props.history.push).toHaveBeenCalledWith(ROUTES.DASHBOARD);
		});
	});

	it('sign-up fails and an error message is rendered', async () => {
		const error = { message: 'Some Error' };
		const props = {
			firebase: {
				doCreateUserWithEmailAndPassword: jest.fn().mockRejectedValue(error),
			},
		};

		const history = createMemoryHistory();
		const { getByText } = render(
			<Router history={history}>
				<SignUpTest {...props} />
			</Router>
		);

		const signUpButton = getByText('Sign Up');
		fireEvent.click(signUpButton);
		await wait(() => {
			expect(getByText('Some Error')).toBeInTheDocument();
		});
	});
});
