/*
    Author: Lee
    Date: October 11th
    Project: mutual-app-rating
*/
/*
    Genesis of the application
 */
function genesis()
{
   commit("Enrollment", { Links: [ { Base: App.DNA.Hash,
   Link: App.Agent.Hash,
   Tag: "Enrollment" } ] })
   return true;
}

///@param{ratee, rater, value}
//arg must be json in order to pass in two ore more values; since,
//Zome functions can have only one argument passed at a time.
function rateHash(arg)
{
   if(!checkIfUnique(arg.ratee arg.rater)){
        return; // Stop the execution of the function when two hashes are the same.
   }
   var rating = {
      "rater": arg.rater.toString(), // One who's being rated.
      "value": arg.value.toString(),
      "category": "general"
   }
   var ratingLink = commit("Rating", rating) //Despite being having the values assigned to the rating being duplicate, the commit will always return a same hash
                                             //because commit() returns the hash of the entry.
   commit("RatingLink", {Links: [{Base: arg.ratee.toString(),
      Link: ratingLink.toString(),
      Tag:"RatingLink"}]})

   var uniqueness = {
      "rater": arg.rater,
      "ratee": arg.ratee
   }
   commit("Uniqueness", uniqueness)
   commit("IsUnique",
      { Links: [ { Base: App.DNA.Hash,
      Link: arg.H_2.toString(),
      Tag: "IsUnique" } ] })
}

function checkIfUnique(arg.H_1, arg.H_2){
    if(arg.H_1 === arg.H_2){
        return false;
    }
}

function viewRating(userHash){
    getLinks("Rating", userHash)
}

function getAllEnrolled(){
    getLinks(App.DNA.Hash, "Enrollment", {Load: true})
}

//function getAllTheRatings(){}

/*
    In order for the commit() to execute, there needs to be a validateCommit().
*/
function validateCommit(){
    return true;
}

function validateLink(){
    return true;
}

function validatePut(){
    return true;
}
