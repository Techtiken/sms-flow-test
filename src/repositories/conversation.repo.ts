import {
  Conversation,
  ConversationStatus,
  Prisma
} from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

type CreateConversationInput = {
  phoneNumber: string;
  flowId: string;
  flowVersion: number;
  currentStep: string;
  contextJson: Prisma.InputJsonValue;
  startedAt: Date;
  lastMessageAt: Date;
  expiresAt: Date | null;
};

export async function findActiveConversationByPhoneNumber(
  phoneNumber: string
): Promise<Conversation | null> {
  const conversation = await prisma.conversation.findFirst({
    where: {
      phoneNumber,
      status: ConversationStatus.active
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  if (!conversation) {
    return null;
  }

  if (conversation.expiresAt && conversation.expiresAt.getTime() <= Date.now()) {
    await prisma.conversation.update({
      where: {
        id: conversation.id
      },
      data: {
        status: ConversationStatus.expired
      }
    });

    return null;
  }

  return conversation;
}

export async function createConversation(
  input: CreateConversationInput
): Promise<Conversation> {
  return prisma.conversation.create({
    data: {
      phoneNumber: input.phoneNumber,
      flowId: input.flowId,
      flowVersion: input.flowVersion,
      currentStep: input.currentStep,
      contextJson: input.contextJson,
      startedAt: input.startedAt,
      lastMessageAt: input.lastMessageAt,
      expiresAt: input.expiresAt
    }
  });
}

export async function updateConversation(
  conversationId: string,
  data: Prisma.ConversationUpdateInput
): Promise<Conversation> {
  return prisma.conversation.update({
    where: {
      id: conversationId
    },
    data
  });
}

export async function completeConversation(
  conversationId: string,
  data: Prisma.ConversationUpdateInput = {}
): Promise<Conversation> {
  return prisma.conversation.update({
    where: {
      id: conversationId
    },
    data: {
      ...data,
      status: ConversationStatus.completed,
      completedAt: new Date()
    }
  });
}

export async function cancelConversation(
  conversationId: string,
  data: Prisma.ConversationUpdateInput = {}
): Promise<Conversation> {
  return prisma.conversation.update({
    where: {
      id: conversationId
    },
    data: {
      ...data,
      status: ConversationStatus.cancelled,
      completedAt: new Date()
    }
  });
}
