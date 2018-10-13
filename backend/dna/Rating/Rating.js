
/**
 * "Rating" Zome API Implementation
 *
 * API Shortlist
 ************************************************************
 * getAllEnrolled
 * getAgentsRating
 * getAgentsAverage
 * rateAgent
 * enrollUser
 * getUserData
 ************************************************************
 */

'use strict';

/**
 * GENESIS
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis ()
{
  commit("EnrollLink", { Links: [{
      Base: App.DNA.Hash,
      Link: App.Agent.Hash,
      Tag: "EnrollLink"
  }]})
  return true;
}


/*
 * Return all the enrolled users.
 * @callingType {json}
 * @exposure {public}
 * @param {type}
 * @return {type}
 */
function getAllEnrolled (params)
{
    return getLinks(App.DNA.Hash, "EnrollLink", { Load: true });
}

/*
 * Returns the latest rating you've rated the other user with.
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "Ratee": "<agenthash>", "Value":"7" }
 * @return {type}
 */
function getAgentsRating (params)
{
  var uniqueness={rater:param.rater,ratee:param.ratee}
  var uniqueness_hash=makeHash("Uniqueness",uniqueness)
  var rating=getLinks(uniqueness_hash,"UniqueLink",{Load:true})
  return rating
}

/*
 * [Description]
 * @callingType {json}
 * @exposure {public}
 * @param {type}
 * @return {type}
 */
function getAgentsAverage (params)
{
  var totalRating = 0
  // Grab all the entries associated with the RatingLink of the specified ratee below.
  var entryArray = getLinks(params.ratee.toString(), "RatingLink", {Load: true})
  //Pretty self explanatory below.
  var totalUsersRated = entryArray.length
  //For each through the Rating entries and grab only the values, and add'em to the totalRating.
  for (var entryObject in entryArray){
    totalgRating = totalRating + parseInt(entryObject.Entry.value, 10)
  }
  var avgRating = totalRating / totalUsersRated //At the end, average things up,
  return {"avgRating": avgRating.toString()}; //Because getAgentsAverage's calling type is json.
}

/*
 * Publishes a rating entry. Accepts the Ratee's Hash & Rating Value.
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "Ratee": "<agenthash>", "Value":"7" }
 * @return {json} { "Success": "true", "Hash": "<entryhash>" }
 */
function rateAgent (params)
{
    var ratingEntry = {
        "rater": App.Agent.Hash, // More secure.
        "value": params.value.toString(),
        "category": params.category.toString()
    }
    var rateAgentEntryHash = commit("Rating", ratingEntry)
    commit("RatingLink", { Links: [{
        Base: params.ratee,
        Link: rateAgentEntryHash,
        Tag: "RatingLink"
    }]})
    var uniqueness = {
        rater: App.Agent.Hash,
        ratee: params.ratee,
    }
    var u_hash=commit("Uniqueness", uniqueness)
    commit("RatingLink", { Links: [{
        Base: u_hash,
        Link: rateAgentEntryHash,
        Tag: "UniqueLink"
    }]})
}

/*
 * Called at Genesis - additional load-time functionality goes here.
 * @callingType {json}
 * @exposure {zome}
 * @param {json} Empty JSON.
 * @return {json} Empty JSON.
 */
function enrollUser (params)
{

    return {};
}

/*
 * Upon call with an empty JSON, returns the current user's metadata.
 * @callingType {json}
 * @exposure {public}
 * @param {type}
 * @return {json} { "Name": "user@mailserver.com",
                            "Hash": "<agenthash>",
                            "Rating": "7"}
 */
function getUserData (params)
{

    return {};
}

/*
 * Calculates the average rating given a JSON
  * mapping of userHashes to ratings.
 * @callingType {json}
 * @exposure {zome}
 * @param {json}
 ** { "hashA": "7", ... ,"hashB": "6" }
 * @return {json}
 ** { "average": "6.5" }
 */
function computeAverage (params)
{

    return {};
>>>>>>> e2e75f9bb5a7bc03059238b534c99845bfd6b120
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateCommit (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "Rating":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "Uniqueness":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validatePut (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "Rating":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "Uniqueness":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {string} replaces - the hash for the entry being updated
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "Rating":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "Uniqueness":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} hash - the hash of the entry to remove
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateDel (entryName, hash, pkg, sources) {
  switch (entryName) {
    case "Rating":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "Uniqueness":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} baseHash - the hash of the base entry being linked
 * @param {?} links - ?
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateLink (entryName, baseHash, links, pkg, sources) {
  switch (entryName) {
    case "Rating":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "Uniqueness":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return false;
    default:
      // invalid entry name
      return false;
  }
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateLinkPkg (entryName) {
  return null;
}
