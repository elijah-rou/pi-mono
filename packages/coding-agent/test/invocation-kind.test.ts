import { afterEach, describe, expect, test } from "vitest";
import { parseArgs } from "../src/cli/args.js";
import { resolveInvocationKind } from "../src/main.js";

const originalInvocationKind = process.env.PI_INVOCATION_KIND;
const originalAgentIdentity = process.env.PI_AGENT_IDENTITY;

afterEach(() => {
	if (originalInvocationKind === undefined) delete process.env.PI_INVOCATION_KIND;
	else process.env.PI_INVOCATION_KIND = originalInvocationKind;
	if (originalAgentIdentity === undefined) delete process.env.PI_AGENT_IDENTITY;
	else process.env.PI_AGENT_IDENTITY = originalAgentIdentity;
});

describe("invocation kind", () => {
	test("parses print source", () => {
		const parsed = parseArgs(["--source", "print"]);
		expect(parsed.source).toBe("print");
		expect(parsed.diagnostics).toEqual([]);
	});

	test("defaults print app mode to print invocation", () => {
		delete process.env.PI_INVOCATION_KIND;
		delete process.env.PI_AGENT_IDENTITY;
		expect(resolveInvocationKind(parseArgs(["-p"]), "print")).toBe("print");
	});

	test("defaults json app mode to print invocation", () => {
		delete process.env.PI_INVOCATION_KIND;
		delete process.env.PI_AGENT_IDENTITY;
		expect(resolveInvocationKind(parseArgs(["--mode", "json"]), "json")).toBe("print");
	});
});
