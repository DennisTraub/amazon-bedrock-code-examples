//  SPDX-License-Identifier: Apache-2.0

import {
    BedrockRuntimeClient,
    InvokeModelWithMessagesCommand
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({region: "us-west-2"});

const modelId = "anthropic.claude-3-haiku-20240307-v1:0";

const prompt = "Explain 'rubber duck debugging' in one line.";

const message = {
    role: "user",
    content: [{text: prompt}],
};

const messages = [message];
const command = new InvokeModelWithMessagesCommand({
    messages,
    modelId,
});
const response = await client.send(command);

const responseText = response.output.message.content[0].text;
console.log(responseText);
