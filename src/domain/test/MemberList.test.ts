import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted fees", () => {
    list.add(member);
    expect(list.totalDiscounted()).toBe(1500);
  });

  test("update fee", () => {
    list.add(member);
    list.updateFee("12345678", 2000);
    expect(list.totalFees()).toBe(2000);
  });

  test("update fee for non-existing member", () => {
    expect(() => list.updateFee("99999999", 2000)).toThrow();
  });

});
