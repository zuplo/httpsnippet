/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */
import type { HTTPSnippetOptions, Request } from '..';
import type { ClientId, TargetId } from '../targets/targets';

import { readFile } from 'fs/promises';
import path from 'path';

import { HTTPSnippet } from '..';

export interface CustomFixture {
  targetId: TargetId;
  clientId: ClientId;
  tests: {
    it: string;
    input: Request;
    options: any;

    /** a file path pointing to the expected custom fixture result */
    expected: string;
  }[];
}

export const runCustomFixtures = ({ targetId, clientId, tests }: CustomFixture) => {
  describe(`custom fixtures for ${targetId}:${clientId}`, () => {
    tests.forEach(({ it: title, expected: fixtureFile, options, input: request }) => {
      it(title, async () => {
        const opts: HTTPSnippetOptions = {};
        // eslint-disable-next-line jest/no-if
        if (options.harIsAlreadyEncoded) {
          opts.harIsAlreadyEncoded = options.harIsAlreadyEncoded;
        }

        const result = new HTTPSnippet(request, opts).convert(targetId, clientId, options);
        const filePath = path.join(__dirname, '..', 'targets', targetId, clientId, 'fixtures', fixtureFile);
        const buffer = await readFile(filePath);
        const fixture = String(buffer);

        expect(result).toStrictEqual(fixture);
      });
    });
  });
};
