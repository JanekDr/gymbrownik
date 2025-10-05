import { SetMetadata } from '@nestjs/common';

/**
 * Dekorator określający, który model ma być sprawdzony w guardzie.
 * Przykład: @Resource('trainingWeek')
 */
export const Resource = (modelName: string) => SetMetadata('resource', modelName);
