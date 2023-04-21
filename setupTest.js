import matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import { server } from './mocks/server.js'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

expect.extend(matchers);
