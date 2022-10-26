export default {
    '/user/sign-up': {
      post: {
        tags: ['User'],
        summary: 'Endpoint for registration user',
        parameters: {
            username: {
                
            }
        },
        responses: {
          200: {
            description: 'OK',
            schema: {
              '$ref': '#/definitions/User'
            }
          }
        }
      }
    }
  }
