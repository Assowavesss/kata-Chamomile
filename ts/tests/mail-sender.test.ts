import { test, expect } from "@jest/globals"
import { MailSender, HttpClient, SendMailRequest, SendMailResponse } from "../mail-sender";
import { User } from "../user";

interface IRequest {
  baseUrl: string; 
  request: SendMailRequest
}

class httpClientImpl implements HttpClient {
  requests: Array<IRequest> = [];
  responseCode: number = 200;
  post(baseUrl: string, request: SendMailRequest): { code: number } {
    this.requests.push({ baseUrl, request });
    return { code: this.responseCode };
  }
}



test('send v1', () => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1
 const httpClient = new httpClientImpl();
 const mailSender = new MailSender(httpClient);
 const user: User = { name: 'John Doe', email: 'john.doe@example.com' };

 mailSender.sendV1(user, 'Hello, World!');
  expect(httpClient.requests).toEqual([
    {
      baseUrl: mailSender.baseUrl,
      request: expect.objectContaining({
        recipient: user.email,
        subject: 'New notification',
        body: 'Hello, World!',
      }),
    },
  ]);

})

test('send v2', () => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV2
  const httpClient = new httpClientImpl();
  httpClient.responseCode = 503;
  const mailSender = new MailSender(httpClient);
  const user: User = { name: 'John Doe', email: 'john.doe@example.com' };

  mailSender.sendV2(user, 'Hello, World!');

  const secondRequest = httpClient.requests[1];

  expect(secondRequest).toEqual(
    {
      baseUrl: mailSender.baseUrl,
      request: expect.objectContaining({
        recipient: user.email,
        subject: 'New notification',
        body: 'Hello, World!',
      }),
    },
  );


})
