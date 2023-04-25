import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { server } from './utils/msw/msw-server.js'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

expect.extend(matchers);
