import { describe, it, expect } from "vitest";
import { sceneStyle } from "./scenes";
import { SCENES } from "../state/types";

describe("sceneStyle", () => {
  it("gives a sky gradient + ground colour for every scene", () => {
    for (const s of SCENES) {
      const st = sceneStyle(s);
      expect(st.sky).toMatch(/gradient/);
      expect(st.ground).toMatch(/#/);
      expect(typeof st.ambient).toBe("string");
    }
  });
});
