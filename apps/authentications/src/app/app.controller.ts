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

import { Controller, Get, Headers, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { API_URL, SUCCESS_MESSAGE } from '@castcle-api/shared/data-access/constants';
import { CustomResponse, CustomErrorResponse } from '@castcle-api/shared/data-access/interface/api';
import { AccessTokenPayload, RefreshTokenPayload, VerifyTokenPayload } from '@castcle-api/shared/data-access/interface/jwt';
import { I18nService } from 'nestjs-i18n';
import { I18nUtil } from '@castcle-api/shared/util/i18n';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { AppService } from './app.service';

@Controller(`${API_URL}/authentication`)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly i18nService: I18nService
    ) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body as {email: string, password: string};
  
    const existingUser = await this.appService.findOne(email, password);
    if (!existingUser) {
      // error response example (can create object and middleware for response error but not have a time)
      res.status(400).send({
        error: {
          code: 3002,
          message: await this.i18nService.translate(I18nUtil.codeToKey(3002)),
        }
      } as CustomErrorResponse);
    }

    const user = await this.appService.findOne(email, password);

    const accessTokenPayload = user as unknown as AccessTokenPayload;
    accessTokenPayload.showAds = true;
    accessTokenPayload.pages = [];
    accessTokenPayload.accessTokenExpiresTime = moment().add(30, 'minutes').toDate();
    
    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });

    const refreshTokenPayload = user as unknown as RefreshTokenPayload;

    refreshTokenPayload.refreshTokenExpiresTime = moment().add(200, 'days').toDate();

    const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });
    
    res.status(200).send({
      message: SUCCESS_MESSAGE,
      payload: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    } as CustomResponse);
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.body as { refreshToken: string };

    if (!refreshToken) {
      // throw error exception
    }

    const refreshTokenDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'jwt-secret') as RefreshTokenPayload;

    if (moment().isAfter(refreshTokenDecoded.refreshTokenExpiresTime)) {
      // throw error exception
    }

    const user = this.appService.findUserById(refreshTokenDecoded.id);

    const accessTokenPayload = user as unknown as AccessTokenPayload;
    accessTokenPayload.showAds = true;
    accessTokenPayload.pages = [];
    accessTokenPayload.accessTokenExpiresTime = moment().add(30, 'minutes').toDate();
    
    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });
    res.status(201).send({
      message: SUCCESS_MESSAGE,
      payload: {
        accessToken: accessToken
      }
    } as CustomResponse);
  }

  @Post('verify-token')
  async verifyToken(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = req.body as { accessToken: string };

    if (!accessToken) {
      // throw error exception
    }

    const accessTokenDecoded = await jwt.verify(accessToken, process.env.JWT_SECRET || 'jwt-secret') as AccessTokenPayload;

    if (moment().isAfter(accessTokenDecoded.accessTokenExpiresTime)) {
      // throw error exception
    }

    console.log(accessTokenDecoded);

    const verifyTokenPayload = {} as VerifyTokenPayload;
    verifyTokenPayload.id = accessTokenDecoded.id;
    verifyTokenPayload.verifyTokenExpiresTime = accessTokenDecoded.accessTokenExpiresTime;
    const verifyToken = jwt.sign(verifyTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });

    res.status(201).send({
      message: SUCCESS_MESSAGE,
      payload: {
        verifyToken: verifyToken
      }
    } as CustomResponse);
  }
}
