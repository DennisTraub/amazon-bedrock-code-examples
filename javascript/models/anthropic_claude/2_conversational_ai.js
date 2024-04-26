//  SPDX-License-Identifier: Apache-2.0

import {
    BedrockRuntimeClient,
    InvokeModelWithMessagesCommand
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({region: "us-west-2"});

const modelId = "mistral.mistral-large-2402-v1:0";

const firstPrompt = "Explain 'rubber duck debugging' in one line.";

const firstResponse = "Rubber duck debugging is the process of explaining" +
    "a problem to an inanimate object, like a rubber duck, to help" +
    "identify and resolve the issue."

const conversation = [
    { role: "user", content: [{text: firstPrompt}] },
    { role: "assistant", content: [{ text: firstResponse }] }
];

const newPrompt = "Does this actually work?";

const newMessage = { role: "user", content: [{text: newPrompt}] };

conversation.push(newMessage);

const command = new InvokeModelWithMessagesCommand({
    messages: conversation,
    modelId
});

const response = await client.send(command);

const responseText = response.output.message.content[0].text;
console.log(responseText);