import type { JSONSchemaType } from 'ajv';
import type { User } from '../../types/api';

export const userSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id', 'name', 'username', 'email'],
  additionalProperties: true
};
