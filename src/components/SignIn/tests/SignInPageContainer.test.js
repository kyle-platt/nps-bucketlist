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
const email = 'info@test.com';
const password = '123abc';
const error = { message: 'some error' };

beforeEach(() => {
    jest.resetAllMocks();
});

describe('SignInPageContainer Tests', () => {
    it('handleSubmit success', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            password,
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
            email,
            password,
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

    it('render', () => {
        const state = {
            ...INITIAL_STATE,
            email,
            password,
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
            password: state.password,
        });
    });
});