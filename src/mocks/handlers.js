// mocks/handlers.js
import { http } from 'msw'
import { HttpResponse } from 'msw'

export const handlers = [
    // By calling "http.get()" we're instructing MSW
    // to capture all outgoing "GET /posts" requests
    // and execute the given response resolver when they
    // happen.
    http.get('/employee/details', () => {
        // And respond with a "text/plain" response
        // with a "Hello world!" text response body.
        return new Response('Hello world!')
    }),
]