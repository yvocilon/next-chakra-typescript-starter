import * as React from "react";
import { Heading, Box } from "@chakra-ui/core";
import useSWR from "swr";
import { GetServerSideProps } from "next";

interface Response {
    message: string;
}

interface Props {
    hello: string;
}

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

const Index = ({ hello }: Props) => {
    const { data = { message: "not loaded" }, error } = useSWR<Response>(
        "/api/hello",
        fetcher
    );

    if (error) {
        return <h1>error.. fuck</h1>;
    }

    return (
        <Box>
            <Heading size="2xl" as="h1">
                api says: {data.message}
            </Heading>
            <Heading size="xl" as="h2">
                Server says: {hello}
            </Heading>
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            hello: "world",
        },
    };
};

export default Index;
