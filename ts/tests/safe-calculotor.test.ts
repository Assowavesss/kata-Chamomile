import { test, expect } from "@jest/globals"
import { SafeCalculator, Authorizer } from "../safe-calculator"


class AuthorizerImpl implements Authorizer {
  authorize(): boolean {
      return true;
  }
} 


test('should not throw when authorized', () => {
  
  // TODO: write a test that fails due to the bug in
  // SafeCalculator.add()
  const safeCalc = new SafeCalculator(new AuthorizerImpl);
  expect(safeCalc.add(1,2)).toBe(3);
})
