export type SendSmsInput = {
  to: string;
  body: string;
};

export type SendSmsResult = {
  provider: string;
  providerMessageId: string | null;
};

export async function sendSms(input: SendSmsInput): Promise<SendSmsResult> {
  console.log("Stub SMS send", input);

  return {
    provider: "stub",
    providerMessageId: null
  };
}
