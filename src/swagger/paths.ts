export default {
  '/user/sign-up': {
    post: {
      tags: ['User'],
      summary: 'Endpoint for registration user',
      consumes: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'User',
          description: 'The user`s data to create',
          schema: {
            $ref: '#/definitions/User'
          }
        }
      ],
      responses: {
        201: {
          description: 'Created',
          content: '{ token }'
        }
      }
    }
  },
  '/user/sign-in': {
    post: {
      tags: ['User'],
      summary: 'Endpoint for authorization user',
      parameters: [
        {
          name: 'username',
          in: 'body',
          type: 'string'
        },
        {
          name: 'password',
          in: 'body',
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/User'
          }
        }
      }
    }
  }
}
