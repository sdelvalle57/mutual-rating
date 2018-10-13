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
 * Get all users enrolled in this app
 * @return {Promise} Promise of a fetched result in a form of an array of all the list elements
 */
export const getAllEnrolled = () => {
    return fetchPOST('/fn/sampleZome/getAllEnrolled').then(r => r.json());
}

/**
 * Get all agents rating
 * @param {Object} obj
 * @param {string} obj.hash - Agent's hash
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const getAgentsRating = (obj) => {
    return fetchPOST('/fn/sampleZome/getAgentsRating', obj).then(r => r.json());
}

/**
 * Get agent's average rating
 * @param {Object} obj 
 * @param {string} obj.hash - Agent's hash
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const getAgentsAverage = (obj) => {
    return fetchPOST('/fn/sampleZome/getAgentsAverage', obj).then(r => r.json());
}

/**
 * Record agent's new rating from other agent
 * @param {Object} obj 
 * @param {string} obj.hash - Rated Agent's hash
 * @param {int} obj.value - numerical value of rating [1,10]
 * @return {Promise} Promise of a fetched result in a form of an array of all the entries
 */
export const rateAgent = (obj) => {
    return fetchPOST('/fn/sampleZome/rateAgent', obj).then(r => r.json());
}

/**
 * Get current user's data
 * @return {Promise} Promise of a fetched result in form of {hash: {string}, name: {string}, average: {number}}
 */
export const getCurrentUsersData = () => {
    return fetchPOST('/fn/sampleZome/getCurrentUsersData').then(r => r.json());
}