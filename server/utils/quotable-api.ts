import axios from 'axios';
import { RandomQuotesProps } from '../types/canvas';
import { quotableAPI } from './constants';

export const getQuoteData = async () => {
	// Uses Axios to make a GET request to the API specified by quotableAPI constant. The await keyword is used to wait for the promise to resolve, and the response is stored in the res variable.
	const res = await axios.get<RandomQuotesProps>(quotableAPI);
	// Extracts the content from the response (res.data.content) and splits it into an array of words using the space character as the delimiter. and return the array.
	return res.data.content.split(' ');
};
