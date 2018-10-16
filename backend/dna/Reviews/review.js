
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
    
    enrollUser({});
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
    return getLinks(App.DNA.Hash, "Enrolled", { Load: true });
}

/*
 * Returns the latest rating you've rated the other user with.
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "Ratee": "<agenthash>" }
 * @return {json} { "Success": true
                            "EntryHash": "<entryhash>",
                            "Value":"7" }
 */
function getAgentsRating (params)
{
    var find = function(items, f) {
        for (var i=0; i < items.length; i++)
        {
            var item = items[i];
            if (f(item)) return item;
        };
        return null;
    }

    var match = find(interacts, function(x) {return x.Entry.ratee == params.Ratee;});
    if (match != null)
    {
        var rating = getLinks(match.Hash, "Pairings", { Load: true });
        var result = {
            "Success": true,
            "EntryHash": rating.Hash,
            "Value": rating.Entry.value
        };

        return result;
    }
    else
    {
        var result = {
            "Success": false,
            "EntryHash": null,
            "Value": null
        };
        return result;
    }
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
 * @return {json} { "Success": true,
                            "EntryHash": "<entryHash>",
                            "InteractionHash": "<interactionHash>"}
 */
function rateAgent (params)
{

    var interacts = getLinks(App.Agent.Hash, "Interactions", { Load : true })

    var find = function(items, f) {
        for (var i=0; i < items.length; i++)
        {
            var item = items[i];
            if (f(item)) return item;
        };
        return null;
    }

    var match = find(interacts, function(x) {return x.Entry.ratee == params.Ratee;});
    if (match == null)
    {
        var ratingEntry = {
            "ratee": params.Ratee, // More secure.
            "value": params.value.toString(),
            "category": params.category.toString()
        }
        // TODO Try Catch around commits
        var entryHash = commit("Rating", ratingEntry)
        commit("RatedByLink", { Links: [{
            Base: params.Ratee,
            Link: entryHash,
            Tag: "RatedBy"
        }]})
        var pairing = {
            "rater": App.Agent.Hash,
            "rated": params.Ratee
        }
        // TODO Try Catch around commits
        var interactionHash = commit("Interaction", pairing)
        commit("InteractionLink", { Links: [{
            Base: App.Agent.Hash,
            Link: interactionHash,
            Tag: "Interactions"
        }]})

        commit("PairingLink", { Links: [{
            Base: interactionHash,
            Link: entryHash,
            Tag: "Pairings"
        }]})

        return {"Success": true,
                    "EntryHash": entryHash,
                    "InteractionHash": interactionHash};
    }
    else
    {
        console.log("Rating already exists.")

        return {"Success": false,
                    "EntryHash": null,
                    "InteractionHash": match.Hash};

    }
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
    // TODO Add try-catch block around commits
    commit("Enrollment", { Links: [{
        Base: App.DNA.Hash,
        Link: App.Agent.Hash,
        Tag: "Enrolled"
    }]})
    return {};
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
      if(getLinks(App.Agent.Hash, "RatingLink") == []){
        return false;
      }
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
      if(getLinks(App.DNA.Hash, "Enrollment"))
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
