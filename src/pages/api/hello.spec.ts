import http from "http";
import fetch from "isomorphic-unfetch";
import listen from "test-listen";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import handler from "./hello";
import { NextApiRequest, NextApiResponse } from "next";

describe("/hello", () => {
    test("responds with hello world", async () => {
        const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
            return apiResolver(req, res, undefined, handler, undefined);
        };
        const server = http.createServer(requestHandler);
        const url = await listen(server);
        const response = await fetch(url);
        expect(response.status).toBe(200);
        expect(await response.json()).toStrictEqual({ message: "Hello World" });
        return server.close();
    });
});
