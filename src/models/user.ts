import { Context } from '../app';
import { UserRow } from '../daos/user';

export default class UserModel {
  private ctx: Context;

  public id: number;
  public externalId: string;
  public username: string;
  public passwordHash: string;
  public email: string;
  public createdAt: Date;
  public updatedAt: Date;
  public gold: number;
  public units: string;
  public offensiveStrength: number;
  public defensiveStrength: number;
  public goldPerTurn: number;

  constructor(ctx: Context, userData: UserRow) {
    this.ctx = ctx;

    this.id = userData.id;
    this.externalId = userData.external_id;
    this.username = userData.username;
    this.passwordHash = userData.password_hash;
    this.email = userData.email;
    this.createdAt = userData.created_at;
    this.updatedAt = userData.updated_at;
    this.gold = userData.gold;
    this.units = userData.units;
    this.offensiveStrength = userData.offensive_strength;
    this.defensiveStrength = userData.defensive_strength;
    this.goldPerTurn = userData.gold_per_turn;
  }

  static async fetchUserByExternalId(
    ctx: Context,
    externalId: string
  ): Promise<UserModel | null> {
    const user = await ctx.daoFactory.user.fetchUserByExternalId(externalId);
    if (!user) return null;

    return new UserModel(ctx, user);
  }
}
