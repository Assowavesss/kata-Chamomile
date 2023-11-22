import { test, expect, beforeAll} from "@jest/globals"
import { DiscountApplier, Notifier } from "../discount-applier";
import { User } from "../user";

interface Notification {
  user: User,
  message: string
}

class NotifierImpl implements Notifier {
  notifications: Array<Notification> = [];

  notify(user: User, message: string): void {
    this.notifications.push({user,message});
  };
} 

 
const users : User[] =
  [
    {name: "user1",
    email: "user1@gmail.com"},
    {name: "user2",
    email: "user2@gmail.com"},
  ]


test('apply v1', () => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV1
  const notifierImpl = new NotifierImpl();
  const ds: DiscountApplier = new DiscountApplier(notifierImpl); 
  ds.applyV1(5,users);
  expect(notifierImpl.notifications.some(notification => notification.user === users[0])).toBe(true);
  
})

test('apply v2', () => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV2
    const notifierImpl = new NotifierImpl();
    const ds: DiscountApplier = new DiscountApplier(notifierImpl); 
    ds.applyV2(5,users);
    expect(notifierImpl.notifications.some(notification => notification.user !== users[0])).toBe(true);
})
