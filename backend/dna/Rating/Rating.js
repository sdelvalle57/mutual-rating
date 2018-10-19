
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
    return true;
}


/*
 * Return all the enrolled users.

 * @callingType {json}
 * @exposure {public}
 * @param {json} {  }
 * @return {json} [ {Hash:"QmY...",
                            EntryType:"<entry-type>",
                            Entry:"<entry value here>",
                            Source:"<source-hash>"} ]
 */
function getAllEnrolled (params)
{
    return getLinks(App.DNA.Hash, "Enrolled", { Load: true });
}

/*
 * Create a new Category Anchor - and return Anchor details.

 * @callingType {json}
 * @exposure {public}
 * @param {json} { "categoryName": "<categorystring>" }
 * @return {json} [ {AnchorHash:"QmY...",
                            AnchorType:"<created-anchor-type>",
                            AnchorText:"<created-anchor-text>"} ]
 */
function createCategory (params)
{

}

/*
 * Returns the list of Ratings of a particular Ratee.
 *
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "Ratee": "<agenthash>" }
 * @return {json} {"Success": true,
                                          "Entries": [
                                                              "Rater": "<hash>": ["Rating": "<string>", "Category": "<categorystring>"],
                                                              "Rater": "<hash>": ["Rating": "<string>", "Category": "<categorystring>"]
                                                           ]
                                          }
 */
function getAgentsRating (params)
{
  try{
    var listOfRatesAndRating = []
    var listOfRatedBy = getLinks(params.Ratee, "RatedBy", {Load: true})

      for(var ratedByLinkEntry in listOfRatedBy){
          var rate = {
              "Rater": listOfRatedBy[ratedByLinkEntry].Entry.rater,
              "Value": listOfRatedBy[ratedByLinkEntry].Entry.value,
              "Category": listOfRatedBy[ratedByLinkEntry].Entry.category
          }
          listOfRatesAndRating.push(rate)
      }
    var result = {
      "Success": true,
      "Entries": listOfRatesAndRating
    }
    return result;
  }catch(error){
    debug(error);
    var result = {"Success": false,
                  "Entries": null}
    return result
  }
}

/*
 * Accepts a Ratee hash-string and a Category string,
 * and returns all of the ratings that Ratee received in that Category.
 *
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "Ratee": "<agenthash>",
                            "Category": "<categoryAnchorText>"}
 * @return {json} {"Success": true,
                            "Entries": [
                                            "Rater": "<hash>",
                                            "Rating": "<string>"
                                        ]
                            }
 */
function getAgentsRatingInCategory (params)
{

}

/*
 * Accepts a Ratee's hash, and returns the community average rating
 * of that Ratee.
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "ratee": "<agenthash>" }
 * @return {type} { "success": true,
                             "averageRating: 7"}
 */
function getAgentsAverage (params)
{
    try
    {
        var totalRating = 0;
        // Grab all the entries associated with the RatingLink of the specified ratee below.
        var entryArray = getLinks(params.Ratee.toString(), "RatedBy", {Load: true});

        // Pretty self explanatory below.
        var totalUsersRated = entryArray.length;

        var avgRating;

        if(totalUsersRated > 0){
            //For each through the Rating entries and grab only the values, and add'em to the totalRating.
            for (var entryObject in entryArray){
                totalRating = totalRating + parseInt(entryArray[entryObject].Entry.value, 10);
            }
            avgRating = totalRating / totalUsersRated //At the end, average things up,
        }
        else{
            avgRating = null;
        }

        return {"success": true,
                    "averageRating": avgRating}; //Because getAgentsAverage's calling type is json.
    }
    catch (error)
    {
        console.log("getAgentsAverage() errored out.");
        console.log(error);

        return {"success": false,
                    "averageRating": null};
    }
}

/*
* Accepts a Ratee hash-string & a Category string, for which
* Ratee all ratings in that category are aggregated and returned.

* @callingType {json}
* @exposure {public}
* @param {json} { "Ratee": "<agenthash>",
                            "Category": "<categoryAnchor>"}
* @return {type} { "Success": true,
                            "AverageRating: 7"}
 */
function getAgentsAverageInCategory (params)
{

}

/*
 * Publishes a rating entry. Accepts the Ratee's Hash & Rating Value.

 * @callingType {json}
 * @exposure {public}
 * @param {json} { "ratee": "<agenthash>",
                            "value": "7",
                            "category": "<anchorText>",
                            "categoryAnchor": "<anchorHash>"}
 * @return {json} { "success": true,
                            "entryHash": "<entryHash>",
                            "interactionHash": "<interactionHash>"}
 */
function rateAgent (params)
{
    // TODO Change this code below to lookup interactions by hash
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
            "rater": App.Agent.Hash,
            "value": parseInt(params.value),
            "category": params.category.toString()
        }
        // TODO Try Catch around commits
        var entryHash = commit("Rating", ratingEntry)
        commit("RatedByLink", { Links: [{
            Base: params.ratee,
            Link: entryHash,
            Tag: "RatedBy"
        }]})

        commit("RatedInLink", { Links: [{
            Base: params.ratee,
            Link: params.categoryAnchor,
            Tag: "RatedIn"
        }]})

        commit("RateeHashLink", { Links: [{
            Base: params.categoryAnchor,
            Link: entryHash,
            Tag: "RatedIn"
        }]})

        var pairing = {
            "rater": App.Agent.Hash,
            "ratee": params.Ratee,
            "category": params.category
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
 * @param {json} {"UserName": "<username>"}
 * @return {json} { "Success": true }
 */
function enrollUser (param)
{
    try
    {
        if(!anchorExists("User", param.UserName)){
          var userAnchorHash = anchor("User", param.UserName)
          commit("EnrollLink", { Links: [{
              Base: userAnchorHash,
              Link: App.Agent.Hash,
              Tag: "Enrolled"
          }]}) // TODO Make EnrollLink bidirectional to link Agent Hash with a single username
        }
        else
        {
          return { "Success": false };
        }
        return { "Success": true };
    }
    catch (error)
    {
        console.log("enrollUser() errored out.");
        console.log(error);
        return { "Success": false }
    }
}

/*
 * Upon call with an empty JSON, returns the current user's metadata.
 * @callingType {json}
 * @exposure {public}
 * @param {json} { "ratee": <agenthash> } (defaults to `App.Agent.Hash` if nothing provided)
 * @return {json} {
                                "success": App.Agent.String,
                                "user":
                                {
                                    name: 'Bob',
                                    hash: 'b723974209bcd',
                                    overallRating: 9.2,
                                    categoryRatings:
                                    [
                                        {
                                            categoryName: 'Stubbornness',
                                            categoryValue: 9.9
                                        },
                                        {
                                            categoryName: 'Tidiness',
                                            categoryValue: 0.1
                                        }
                                    ]
                                }
                            }
 */
function getUserData (params)
{
    var communityAvg = getAgentsAverage({ "Ratee": App.Agent.Hash });
    var categories = getLinks(App.Agent.Hash, "RatedIn");
    // TODO Weed out extras from categories here - list of category names only needed.
    var categoryAvgs = [];
    for (var i = 0; i < categories.length; i++)
    {
        categoryAvgs.push(getAgentsAverageInCategory(actions[i]);
    }
    var userData =
    {
        "success": true,
        "user":
        {
            name: "",
            hash: App.Agent.Hash,
            overallRating: communityAvg.averageRating,
            categoryRatings: categoryAvgs
        }
    }

    return userData;
}

function anchor(anchorType, anchorText)
{
    return call('anchors', 'anchor', {
        anchorType: anchorType,
        anchorText: anchorText
    }).replace(/"/g, '');
}

function anchorExists(anchorType, anchorText)
{
    return call('anchors', 'exists', {
        anchorType: anchorType,
        anchorText: anchorText
    });
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
      return true;
    case "Interaction":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "RatedByLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "PairingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "InteractionLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
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
      return true;
    case "Interaction":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "RatingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
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
    case "Interaction":
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
    case "Interaction":
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
    case "EnrollLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "RatedByLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "PairingLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    case "InteractionLink":
      // be sure to consider many edge cases for validating
      // do not just flip this to true without considering what that means
      // the action will ONLY be successfull if this returns true, so watch out!
      return true;
    default:
      // invalid entry name
      return false;
  }
  return true
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
