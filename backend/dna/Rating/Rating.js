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
  return true;
}

///@param{H_1, H_2, r}
//arg must be json in order to pass in two ore more values; since,
//Zome functions can have only one argument passed at a time.
function rateHash(arg)
{
   checkIfUnique(arg.H_1, arg.H_2)
   var rating = {
      "rater": arg.H_1,
      "": /* Will have to communicate with the front-end.*/,
      "category": "general"
   }
   commit("Rating", rating)
   var uniqueness = {
      "rater": arg.H_1,
      "rateed": arg.H_2
   }
   commit("Uniqueness", uniqueness)

   commit("Enroll",
    { Links: [ { Base: App.DNA.Hash,
    Link: arg.H_1.toString(),
    Tag: "Enrollment" } ] })
    commit("Enroll",
     { Links: [ { Base: App.DNA.Hash,
     Link: arg.H_2.toString(),
     Tag: "Enrollment" } ] })
}

function checkIfUnique(arg.H_1, arg.H_2){
    if(arg.H_1 === arg.H_2){
        throw "Two of the same hashes has been passed in."
    }
}

function viewRating(userHash){
    getLinks("Rating", userHash)
}

function getAllEnrolled(){
    getLinks(App.DNA.Hash, "Enrollment")
}

/*
    In order for the commit() to execute, there needs to be a validateCommit().
*/
function validateCommit(){
    return true;
}
