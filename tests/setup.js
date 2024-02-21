import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url)
})