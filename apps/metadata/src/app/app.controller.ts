/*
 * Copyright (c) 2021, Castcle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 * 
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.
 * 
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * version 3 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 * 
 * You should have received a copy of the GNU General Public License version
 * 3 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 * 
 * Please contact Castcle, 22 Phet Kasem 47/2 Alley, Bang Khae, Bangkok, 
 * Thailand 10160, or visit www.castcle.com if you need additional information 
 * or have any questions.
 */
import { Controller, Get, Headers, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nLang } from 'nestjs-i18n';

import { CustomResponse } from '@castcle-api/shared/data-access/interface/api';
import { HEADERS, API_URL, SUCCESS_MESSAGE } from '@castcle-api/shared/data-access/constants';
import { AppService } from './app.service';

// nestjs v7 cannot use version feature of the nestjs framework

@Controller(`${API_URL}/metadata`)
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}

  @Get('features')
  async getFeature(@Headers() headers, @Req() req: Request, @Res() res: Response, @I18nLang() lang: string) {
    const version = headers[HEADERS.ACCEPT_VERSION] || headers[HEADERS.ACCEPT_VERSION.toLowerCase()];
    switch (version) {
      case '1.0': {
        await this.getFeatureV1(res, lang);
      }
      break;
      case '2.0': {
        await this.getFeatureV2(res, lang);
      }
      break;
      default: {
        await this.getFeatureV1(res, lang);
      }
      break;
    }
  }

  private async getFeatureV1(@Res() res: Response, @I18nLang() lang: string) {
    res.status(HttpStatus.OK).json(
      {
        message: SUCCESS_MESSAGE,
        payload: await this.appService.getFeatureV1(lang)
      } as CustomResponse
    );
  }

  private async getFeatureV2(@Res() res: Response, @I18nLang() lang: string) {
    res.status(HttpStatus.OK).json(
      {
        message: SUCCESS_MESSAGE,
        payload: await this.appService.getFeatureV2(lang)
      } as CustomResponse
    );
  }
}
