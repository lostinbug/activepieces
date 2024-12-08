import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listProgramsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_programs',
  displayName: 'List Programs',
  description: 'Retrives all programs.',
  props: {
    rootLevelOnly: Property.Checkbox({
      displayName: 'Root Level Only',
      description: 'If true, only root level programs will be returned.',
      defaultValue: false,
      required:false
    }),
  },
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listPrograms({rootLevelOnly:context.propsValue.rootLevelOnly || false});
  },
});
