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

import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nUtil } from '@castcle-api/shared/util/i18n';

const mockData = [
  {
    id: '',
    slug: '',
    name: 'Feed',
    key: 'feature.feed',
    createdAt: '2021-06-05T15:40:29Z',
    updateAt: '2021-06-05T15:40:29Z'
  },
  {
    id: '',
    slug: '',
    name: 'Photo',
    key: 'feature.photo',
    createdAt: '2021-06-05T15:40:29Z',
    updateAt: '2021-06-05T15:40:29Z'
  },
  {
    id: '',
    slug: '',
    name: 'Watch',
    key: 'feature.watch',
    createdAt: '2021-06-05T15:40:29Z',
    updateAt: '2021-06-05T15:40:29Z'
  }
]
@Injectable()
export class AppService {

  constructor(
    private readonly i18nService: I18nService
  ) { }

  async getFeatureV1(lang: string): Promise<any> {
    const data = {...mockData[0]};
    data.name = await this.i18nService.translate(I18nUtil.wordToKey(data.name), {
      lang: lang
    });
    return [ data ];
  }

  async getFeatureV2(lang: string): Promise<any> {
    const dataList = [...mockData];
    for(const data of dataList) {
      data.name = await this.i18nService.translate(I18nUtil.wordToKey(data.name), {
        lang: lang
      });
    }
    return mockData;
  }
}
