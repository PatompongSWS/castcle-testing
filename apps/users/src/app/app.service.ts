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
import { User } from '@castcle-api/shared/data-access/interface/user';
import { HashPasswordUtil } from '@castcle-api/shared/util/hash-password';

@Injectable()
export class AppService {
  async findOne(email: string, password: string): Promise<User> {
    return {
      type: "people",
      id: "1234",
      castcleId: "castcle-avenger",
      displayName: "castcle avenger",
      email: email,
      avatar: "url",
      preferredLanguage: ["th","en"],
      role: "member",
      verified: true,
    } as User;
  }

  async createUser(email: string, password: string): Promise<User> {
    return {
      type: "people",
      id: "1234",
      castcleId: "castcle-avenger",
      displayName: "castcle avenger",
      email: email,
      avatar: "url",
      preferredLanguage: ["th","en"],
      role: "member",
      verified: false,
      password: await HashPasswordUtil.hashPassword(password),
    } as User;
  }
}
