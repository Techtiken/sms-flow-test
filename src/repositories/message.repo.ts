import { Message, MessageDirection, Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

type CreateMessageInput = {
  conversationId?: string | null;
  direction: MessageDirection;
  provider: string;
  providerMessageId?: string | null;
  fromNumber: string;
  toNumber: string;
  body: string;
  rawPayload?: unknown;
};

export async function findMessageByProviderAndMessageId(
  provider: string,
  providerMessageId: string
): Promise<Message | null> {
  return prisma.message.findUnique({
    where: {
      provider_providerMessageId: {
        provider,
        providerMessageId
      }
    }
  });
}

export async function createMessage(input: CreateMessageInput): Promise<Message> {
  return prisma.message.create({
    data: {
      conversationId: input.conversationId ?? null,
      direction: input.direction,
      provider: input.provider,
      providerMessageId: input.providerMessageId ?? null,
      fromNumber: input.fromNumber,
      toNumber: input.toNumber,
      body: input.body,
      rawPayload:
        input.rawPayload === undefined
          ? Prisma.JsonNull
          : (input.rawPayload as Prisma.InputJsonValue)
    }
  });
}

export async function attachConversationToMessage(
  messageId: string,
  conversationId: string
): Promise<Message> {
  return prisma.message.update({
    where: {
      id: messageId
    },
    data: {
      conversationId
    }
  });
}
