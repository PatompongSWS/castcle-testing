import { Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

@Module({
  controllers: [],
  providers: [],
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'th',
      parser: I18nJsonParser,
      fallbacks: {
        'en-*': 'en',
      },
      parserOptions: {
        path: path.join(__dirname, '/lib/i18n/'),
      },
    }),
  ],
  exports: [I18nModule],
})
export class SharedNestUtilI18nModule {}
