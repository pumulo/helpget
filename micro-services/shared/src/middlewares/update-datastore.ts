import axios from 'axios';

export const persistCaseData = async (
    storageUrl: string,
    caseId: string,
    currentUser: string,
    payLoad: string
) => {
    // submit to datastore - use a rest service
    // error and security details pending
    const body = {
        caseId,
        currentUser,
        payLoad,
    }
    try {
        const response = await axios.post(storageUrl, body);
        return response.data;
    } catch (err) {
        console.log(err);
    };

    return `todo_${Math.floor(Math.random() * 500000)}`;
}