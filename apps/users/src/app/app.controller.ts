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

import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AccessTokenPayload, RefreshTokenPayload } from '@castcle-api/shared/data-access/interface/jwt';
import { CustomResponse } from '@castcle-api/shared/data-access/interface/api';
import { API_URL, SUCCESS_MESSAGE } from '@castcle-api/shared/data-access/constants';
import * as moment from 'moment';

import { AppService } from './app.service';

@Controller(`${API_URL}/user`)
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Post('create')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const { email, password} = req.body as {email: string, password: string};
    const existingUser = await this.appService.findOne(email, password);

    if (existingUser) {
      // throw error exception
    }

    const user = await this.appService.createUser(email, password);

    const accessTokenPayload = user as unknown as AccessTokenPayload;
    accessTokenPayload.showAds = true;
    accessTokenPayload.pages = [];
    accessTokenPayload.accessTokenExpiresTime = moment().add(30, 'minutes').toDate();
    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });

    const refreshTokenPayload = user as unknown as RefreshTokenPayload;
    refreshTokenPayload.refreshTokenExpiresTime = moment().add(200, 'days').toDate();

    const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET || 'jwt-secret', { algorithm: 'HS256' });
    
    res.status(201).send({
      message: SUCCESS_MESSAGE,
      payload: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    } as CustomResponse);
  }
}
