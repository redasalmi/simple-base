import { cleanup } from "@solidjs/testing-library";
import { afterEach } from "vitest";

// Browser mode has no global `afterEach`, so testing-library can't register its own cleanup.
afterEach(cleanup);
