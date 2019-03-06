import streams from '../apis/streams';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import history from '../history';

export const signIn = userid => {
    return {
        type: SIGN_IN,
        payload: userid
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};

export const createStream = formvalues => async (dispatch, getState) => {
    const { userId } = getState().auth; //destructure
    const response = await streams.post('/streams', { ...formvalues, userId }); //add userid to formvalues
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //do some programmatic navigation to get the user back to the root route
    history.push('/');// ' ' to show the url we want to go to
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const editStream = (id, formvalues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formvalues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}
export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });// put (id) here for reducer
}

