// This file contains wrapper fuhnctions to all the functions exposed by Holochain server API

/**
 * Helper function for POST requests to Holochain server
 * @param  {string} endpoint - holochain's zome API address
 * @param  {Object|string} [data] - Object of data that will be sent with the request in request's body
 * @return {Promise} Promise of a fetched result
 */
const fetchPOST = (endpoint, data) => {
    data = data || "";
    return fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

/**
 * Handle errors from server
 * @param  {Object} response - response form server
 */
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/**
 * Enroll curent user in the app
 * @param {string} name - selected name for user
 * @return {Promise} Promise of a fetched result in a form of an array of all the list elements
 */
export const enrollUser = (obj) => {
    if (obj.userName === 'bob')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: 'false'
                })
            }, 200);
        });
    else 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: 'true'
                })
            }, 200);
        });
    // return fetchPOST('/fn/Rating/enrollUser', obj).then(handleErrors).then(r => r.json());
}

/**
 * Get all users enrolled in this app
 * @return {Promise} Promise of a fetched result in a form of an array of all the list elements
 */
export const getAllEnrolled = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                name: "Alice",
                hash: "a723974209abc"
            },
            {
                name: "Bob",
                hash: "b723974209bcd"
            }
        ]);
    });
    // return fetchPOST('/fn/Rating/getAllEnrolled').then(handleErrors).then(r => r.json());
}

/**
 * Get all agents rating
 * @param {Object} obj
 * @param {string} obj.hash - Agent's hash
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const getAgentsRating = (obj) => {
    return fetchPOST('/fn/Rating/getAgentsRating', obj).then(handleErrors).then(r => r.json());
}

/**
 * Get agent's average rating
 * @param {Object} obj 
 * @param {string} obj.hash - Agent's hash
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const getAgentsAverage = (obj) => {
    // return new Promise((resolve, reject) => {
    //     resolve(
    //         {
    //             hash: "b723974209bcd",
    //             average: "9.9"
    //         }
    //     );
    // });
    return fetchPOST('/fn/Rating/getAgentsAverage', obj).then(handleErrors).then(r => r.json());
}

/**
 * Record agent's new rating from other agent
 * @param {Object} obj 
 * @param {string} obj.hash - Rated Agent's hash
 * @param {int} obj.value - numerical value of rating [1,10]
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const rateAgent = (obj) => {
    // return new Promise((resolve, reject) => {
    //     resolve({});
    // });
    return fetchPOST('/fn/Rating/rateAgent', obj).then(handleErrors).then(r => r.json());
}

/**
 * Get current user's data, returned in a form of an object:
 * {
 *  hash: {string}, 
 *  name: {string}, 
 *  average: {number}
 * }
 * @param {Object} obj 
 * @param {string} obj.hash - Agent's hash
 * @return {Promise} Promise of a fetched result in form of {hash: {string}, name: {string}, average: {number}}
 */
export const getUsersData = (obj) => {

    // return fetch('/fn/Rating/getUserData', obj).then(handleErrors).then(r => r.json());
    /*return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: 'false'
            })
        }, 200);
    });*/

    if (obj)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: 'true',
                    user: {
                        name: 'Alice',
                        hash: 'a355343974209bcd',
                        overallRating: 6.3,
                        categoryRatings: [
                            {
                                categoryName: 'Stubbornness',
                                categoryValue: 6.2
                            },
                            {
                                categoryName: 'Grumpiness',
                                categoryValue: 2.0
                            },
                            {
                                categoryName: 'Tidiness',
                                categoryValue: 8
                            }
                        ]
                    }
                })
            }, 200);
        });
        
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: 'true',
                user: {
                    name: 'Bob',
                    hash: 'b723974209bcd',
                    overallRating: 9.2,
                    categoryRatings: [
                        {
                            categoryName: 'Stubbornness',
                            categoryValue: 9.9
                        },
                        {
                            categoryName: 'Grumpiness',
                            categoryValue: 5.7
                        },
                        {
                            categoryName: 'Tidiness',
                            categoryValue: 0.1
                        }
                    ]
                }
            })
        }, 200);
    });
}