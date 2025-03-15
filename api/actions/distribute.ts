import { GoogleGenerativeAI } from "@google/generative-ai";
const key:string = process.env.GEMINI_API_KEY == undefined ? "":process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

export const params = {
  prompt: {type: "string"},
};

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const foodBanks = await api.foodBanks.findMany();
  let placeList = "";
  for(let entry of foodBanks){
    placeList += entry.name + " with " + (entry.current/entry.capacity) + "\n";
  }
  const shelters = await api.foodBanks.findMany();
  const response = await model.generateContent(params.prompt);
  // Extract the text content from the response
  const textContent = response.response.text();
  return placeList;
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