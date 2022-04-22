import mockedTodosMethods from "@utils/mockedTodosMethods";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    let response;
    if (body.id && !body.newData) {
      response = await mockedTodosMethods.remove(body.id);
    } else if (body.id && body.newData) {
      response = await mockedTodosMethods.update(body.id, body.newData);
    } else {
      response = await mockedTodosMethods.add(body);
    }
    res.status(200).json(response);
  } else if (req.method === "GET") {
    res
      .status(200)
      .json(await mockedTodosMethods.get(Number(req?.query?.id) ?? undefined));
  }
}
