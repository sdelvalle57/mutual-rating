# Oct 8 Standup Notes

## Holochain Glossary

### When the agent goes offline

#### hcd
 - Source Chain retained by the DHT.

#### hcdev

 - Source Chain not retained.

### Identifying Agents by `@usertag`

 - Locate agent using `App.Agent.Hash`.
 - Determine agent `@usertag` from `App.Agent.string`

### Rating an Agent

 - Locate agent using `App.Agent.Hash`.
 - Link to this Agent the entry in your own Source Chain, that is the rating itself. 

## Parameter listings

### Initial parameters

 - Individual Categorical Rating [ICR] (published by Rater)
 - Aggregate  Individual Rating [AIR] (each Rater's rating aggregated over a selected Ratee)
 - Categorical Aggregate Rating [CAR] (each Ratee's ratings aggregated over a particular category)
 - Aggregate Community Rating [ACR] (every Rater's rating aggregated over a selected Ratee)

### Initial functionality

 - `computeACR(Ratee) -> [ACR]`
     - Accepts an Agent's Key (which is the Ratee), and returns the ACR for that Agent.
 - `computeAIR(Ratee, Rater) -> [AIR]`
     - Accepts a Rater & Ratee's Keys, and returns the AIR for the value that Rater imparted to that Ratee.
 - `computeICR(Ratee, Rater, Category) -> [ICR]`
     - Accepts a Rater & `Ratee`'s Keys, and returns the `ICR` for the value that Rater imparted to that `Ratee` for that respective category.
 - `computeCAR(Ratee, Category) -> [CAR]`
     - Accepts a `Ratee` Key & a `Category` for whom all ratings in that category are aggregated and returned (`CAR` is returned).
 - `publishRating(Ratee, Category)`
     - Accepts a `Ratee`'s key, and a `Category`, and commits that rating entry to the Rater's source chain.
 - `awaitRating()`
     - Callback from when a Rater rates a Ratee - notifies the Ratee that it was rated, at which point a Status entry can be published.
 - `publishStatus(entryHash)`
     - Accepts a hash, which is the entryHash for the Rating published on the Rater's chain, and uses that to recompute the Aggregated ratings in the Status entry in the Ratee's chain, and then publishes those ratings as a Status entry.

### Entry Types

- Rating
    - Reliability : `int`
    - Accuracy : `int`
    - Quality : `int`
    - AIR : `int`
    - Ratee : `<RateeAgentsHash>`

 - Status
     - NumberofRatings : `int`
     - ACR : `int`
     - CAR1 : `int`
     - CAR2 : `int`
     - CAR3 : `int`

#### Notes on Entry Types

         
- CAR1,2,3 are the categories "Reliability", "Accuracy", & "Quality" respectively.
- "NumberofRatings" is necessary to recompute the averages, since to recompute an average when using a running sum, we only need to store the number of elements being averaged over and the running sum, so that for the new value being added to the average for an Aggregate rating, we can simply add the value to the running sum, increment the number of ratings, then `RunningSum/NumberOfRatings` would give us the new Aggregate rating. Prevents us from having to recompute the total number of ratings each time.
- Using a `Status` entry helps reduce computational cost in doing a parametrized lookup over a dense graph, which is what we would end up having to do - instead we can rely upon asynchronicity to get the computations over with the instant a rating is published, and publish the result to the source chain such that at any given time from anywhere the lookup is always instant. The overhead of the lookup, is replaced by adding a few _ms_ onto the time it would have taken to publish the rating itself, with a simple notification to the Ratee. Potentially, on the Ratee's side, if faced with traffic of many Rating notifications, Status update entries can be batched within the `publish` function, so that we commit to the chain every `n` Rating notifications rather than every single notification, but this is a consideration for the future, managing for which is trivial.
- Simply looking for the latest `Status` entry would provide the latest rating information for a particular Agent, removing the issue entirely of having to re-lookup the rating information every time it changed.

### Key Categories

 - `Reputation` - defines a fixed value that is the reputation of the Agent.
 - {`Additional`}+ - defines a fixed value that is a rating for any additional categories.