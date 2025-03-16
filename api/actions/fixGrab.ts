import { GoogleGenerativeAI } from "@google/generative-ai";
const key:string = process.env.GEMINI_API_KEY == undefined ? "":process.env.GEMINI_API_KEY;
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const params = {
  db: {type: "string"},
  amt: {type: "string"},
  name: {type: "string"},
};

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const shelDB = await api.shelters;
  const foodDB = await api.foodBanks;
  if(params.db == "shelter"){
    return shelDB;
  }
  return foodDB;
/*
  if(params.db == "shelter"){
    if(params.amt == "many"){
      return shelDB.findMany();
    }else{
      return shelDB.findFirst({
      filter: {name: {equals: params.name}}
    });
    }
  }else{
    if(params.amt == "many"){
      return foodDB.findMany();
    }else{
      return foodDB.findFirst({
      filter: {name: {equals: params.name}}
    });
    }
  }
  return shelDB;*/
};