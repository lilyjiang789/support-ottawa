import { GoogleGenerativeAI } from "@google/generative-ai";
const key:string = process.env.GEMINI_API_KEY == undefined ? "":process.env.GEMINI_API_KEY;
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const params = {
  db: {type: "string"},
  going: {type: "number"},
  details: {type: "string"},
  dist: {type: "array", items: {type: "array", items: {type: "number"}}},
};

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});
  //Check Array
  if (!params.dist || !Array.isArray(params.dist)) {
    logger.error("Invalid dist parameter: expected an array but received", typeof params.dist);
    throw new Error("Invalid dist parameter: expected an array");
  }
  //Determine search area
  let place;
  if(params.db == "shelter"){
    place = await api.shelter.findMany();
  }else{
    place = await api.foodBanks.findMany();
  }

  //Create list of places and capacities
  let placeList = "";
  for(let entry of params.dist){
    if(entry[0]  >= place.length) continue;
    let currPlace = place[entry[0]];
    placeList += currPlace.name + " is at " + (100*currPlace.current/currPlace.capacity).toFixed(2) + "% Capacity and is " + entry[1] + "m far away.\n";
  }

  //Determine statement type
  let statement = "";
  if(params.going != 1){
    statement = "Where should I increase capacity to keep place capacities even"
  }else{
    statement = "Which place should I decrease capacity to keep place capacities even"
  }

  //Construct Prompt
  let prompt = "Given these places:\n" + placeList + 
                statement + " while taking distance into account? Please also account for how " + 
                params.details + "\n Respond with the place I should go in the first line and reasoning after.";
  logger.info(prompt);

  //Ask AI
  const response = await model.generateContent(prompt);
  
  // Extract the text content from the response
  const textContent = response.response.text();
  return textContent;
};

/*export const options: ActionOptions = {
  actionType: "custom",
  // Setting returnType to `true` as it is false by default on a model action
  returnType: true,
};*/

/*export const onSuccess: ActionOnSuccess = async ({ params, logger }) => {
  logger.info(params, " :0");
};*/