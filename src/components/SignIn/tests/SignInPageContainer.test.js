import { shallow } from 'enzyme';
import { SignInPageContainerTest, INITIAL_STATE } from '../SignInPageContainer';
import SignInPageView from '../SignInPageView';
import * as ROUTES from '../../../constants/routes';

jest.mock('../SignInPageView');

const event = {
    target: {
        name: 'username',
        value: 'usertest'
    },
    preventDefault: jest.fn(),
};

const error = { message: 'some error' };

beforeEach(() => {
    jest.resetAllMocks();
});

describe('SignInPageContainer Tests', () => {
    it('handleSubmit success', () => {
        const state = {
            ...INITIAL_STATE,
            email: 'info@test.com',
            password: '123abc',
        };
        const props = {
            firebase: {
                doSignInWithEmailAndPassword: jest.fn().mockResolvedValue(),
            },
            history: {
                push: jest.fn(),
            },
        };
        const theContainer = new SignInPageContainerTest(props);
        theContainer.setState = jest.fn();
        theContainer.state = state;
        return theContainer.handleSubmit(event).then(() => {
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.firebase.doSignInWithEmailAndPassword).toHaveBeenCalledWith(
                state.email,
                state.password,
            );
            expect(theContainer.setState).toHaveBeenCalledWith({ ...INITIAL_STATE });
            expect(props.history.push).toHaveBeenCalledWith(ROUTES.DASHBOARD);
            expect(theContainer.setState).not.toHaveBeenCalledWith({ error });
        });
    });
    it('handleSubmit failure', () => {
        const state = {
            ...INITIAL_STATE,
            email: 'info@test.com',
            password: '123abc',
        };
        const props = {
            firebase: {
                doSignInWithEmailAndPassword: jest.fn().mockRejectedValue(error),
            },
            history: {
                push: jest.fn(),
            },
        };
        const theContainer = new SignInPageContainerTest(props);
        theContainer.setState = jest.fn();
        theContainer.state = state;
        return theContainer.handleSubmit(event).then(() => {
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.firebase.doSignInWithEmailAndPassword)
            .toHaveBeenCalledWith(state.email, state.password);
            expect(theContainer.setState).not.toHaveBeenCalledWith({ ...INITIAL_STATE });
            expect(props.history.push).not.toHaveBeenCalled();
            expect(theContainer.setState).toHaveBeenCalledWith({ error });
        });
    });

    it('handleChange', () => {
        const theContainer = new SignInPageContainerTest();
        theContainer.setState = jest.fn();
        theContainer.handleChange(event);
        expect(theContainer.setState).toHaveBeenCalledWith({ [event.target.name]: event.target.value });
    });

    it('isInvalid returns true when email and password are empty strings', () => {
        const state = {
            ...INITIAL_STATE,
        };
        const theContainer = new SignInPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.password)).toBe(true);
    });
    it('isInvalid returns true when email is an empty string and password contains a value', () => {
        const state = {
            ...INITIAL_STATE,
            password: '123abc',
        };
        const theContainer = new SignInPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.password)).toBe(true);
    });
    it('isInvalid returns true when email contains a value and password is an empty string', () => {
        const state = {
            ...INITIAL_STATE,
            email: 'info@test.com',
        };
        const theContainer = new SignInPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.password)).toBe(true);
    });
    it('isInvalid returns false when email and password contain a value', () => {
        const state = {
            ...INITIAL_STATE,
            email: 'info@test.com',
            password: '123abc',
        };
        const theContainer = new SignInPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.password)).toBe(false);
    });

    it('render', () => {
        const state = {
            ...INITIAL_STATE,
            email: 'info@test.com',
            password: '123abc',
            error,
        };
        const theContainer = new SignInPageContainerTest();
        theContainer.state = state;
        shallow(theContainer.render());
        expect(SignInPageView.mock.calls[0][0]).toStrictEqual({
            email: state.email,
            error: state.error,
            handleChange: theContainer.handleChange,
            handleSubmit: theContainer.handleSubmit,
            isInvalid: theContainer.isInvalid(state.email, state.password),
            password: state.password,
        });
    });
});