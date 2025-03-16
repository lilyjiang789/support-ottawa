import { deleteRecord, ActionOptions } from "gadget-server";
import { preventCrossUserDataAccess } from "gadget-server/auth";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  await deleteRecord(record);
  await preventCrossUserDataAccess(params, record);
};

export const options: ActionOptions = {
  actionType: "delete",
};
