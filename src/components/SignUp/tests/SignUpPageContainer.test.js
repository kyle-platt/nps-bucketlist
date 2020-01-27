import { shallow } from 'enzyme';
import { SignUpPageContainerTest, INITIAL_STATE } from '../SignUpPageContainer';
import SignUpPageView from '../SignUpPageView';
import * as ROUTES from '../../../constants/routes';

jest.mock('../SignUpPageView');

const event = {
    target: {
        name: 'username',
        value: 'usertest'
    },
    preventDefault: jest.fn(),
};
const email = 'info@test.com';
const passwordOne = '123abc';
const passwordTwo = '123abc';
const error = { message: 'some error' };

beforeEach(() => {
    jest.resetAllMocks();
});

describe('SignUpPageContainer Tests', () => {
    it('handleSubmit success', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordOne,
            passwordTwo,
        };
        const props = {
            firebase: {
                doCreateUserWithEmailAndPassword: jest.fn().mockResolvedValue(),
            },
            history: {
                push: jest.fn(),
            },
        };
        const theContainer = new SignUpPageContainerTest(props);
        theContainer.setState = jest.fn();
        theContainer.state = state;
        return theContainer.handleSubmit(event).then(() => {
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.firebase.doCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
                state.email,
                state.passwordOne,
            );
            expect(theContainer.setState).toHaveBeenCalledWith({ ...INITIAL_STATE });
            expect(props.history.push).toHaveBeenCalledWith(ROUTES.DASHBOARD);
            expect(theContainer.setState).not.toHaveBeenCalledWith({ error });
        });
    });
    it('handleSubmit failure', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordOne,
            passwordTwo,
        };
        const props = {
            firebase: {
                doCreateUserWithEmailAndPassword: jest.fn().mockRejectedValue(error),
            },
            history: {
                push: jest.fn(),
            },
        };
        const theContainer = new SignUpPageContainerTest(props);
        theContainer.setState = jest.fn();
        theContainer.state = state;
        return theContainer.handleSubmit(event).then(() => {
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.firebase.doCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
                state.email,
                state.passwordOne
            );
            expect(theContainer.setState).not.toHaveBeenCalledWith({ ...INITIAL_STATE });
            expect(props.history.push).not.toHaveBeenCalled();
            expect(theContainer.setState).toHaveBeenCalledWith({ error });
        });
    });

    it('handleChange', () => {
        const theContainer = new SignUpPageContainerTest();
        theContainer.setState = jest.fn();
        theContainer.handleChange(event);
        expect(theContainer.setState).toHaveBeenCalledWith({ [event.target.name]: event.target.value });
    });

    it('isInvalid returns true when email, passwordOne, and passwordTwo are empty strings', () => {
        const state = {
            ...INITIAL_STATE,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when email and passwordOne are empty strings', () => {
        const state = {
            ...INITIAL_STATE,
            passwordTwo,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when email and passwordTwo are empty strings', () => {
        const state = {
            ...INITIAL_STATE,
            passwordOne,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when passwordOne and passwordTwo are empty strings', () => {
        const state = {
            ...INITIAL_STATE,
            email,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when email is an empty string', () => {
        const state = {
            ...INITIAL_STATE,
            passwordOne,
            passwordTwo,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when passwordOne is an empty string', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordTwo,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns true when passwordTwo is an empty string (passwordOne does not equal passwordTwo)', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordOne,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(true);
    });

    it('isInvalid returns false when there is an email and both passwords match', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordOne,
            passwordTwo,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        expect(theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo)).toBe(false);
    });

    it('render', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            passwordOne,
            passwordTwo,
            error,
        };
        const theContainer = new SignUpPageContainerTest();
        theContainer.state = state;
        shallow(theContainer.render());
        expect(SignUpPageView.mock.calls[0][0]).toStrictEqual({
            email: state.email,
            error: state.error,
            handleChange: theContainer.handleChange,
            handleSubmit: theContainer.handleSubmit,
            isInvalid: theContainer.isInvalid(state.email, state.passwordOne, state.passwordTwo),
            passwordOne: state.passwordOne,
            passwordTwo: state.passwordTwo,
        });
    });
});