import { describe, it, expect } from "vitest";
import { encodeGarden, decodeGarden, linkFor, parseHash } from "./share";
import { createGarden, addPlant } from "./garden";

const sample = () =>
  addPlant(createGarden({ scene: "sea", a: "Sam", b: "Robin", at: 1 }),
    { type: "rose", palette: "coral", x: 2, y: 1, by: "a", note: "for you", at: 2 });

describe("encode/decode round-trip", () => {
  it("is lossless", () => {
    const g = sample();
    expect(decodeGarden(encodeGarden(g))).toEqual(g);
  });
  it("rejects garbage", () => {
    expect(decodeGarden("not-valid")).toBeNull();
    expect(decodeGarden("")).toBeNull();
  });
});

describe("linkFor / parseHash", () => {
  it("builds a #g= link and parses it back", () => {
    const g = sample();
    const url = linkFor(g, "https://x.dev/garden/");
    expect(url).toContain("#g=");
    expect(parseHash(new URL(url).hash)).toEqual(g);
  });
  it("parseHash returns null when no garden present", () => {
    expect(parseHash("#nothing")).toBeNull();
  });
});
