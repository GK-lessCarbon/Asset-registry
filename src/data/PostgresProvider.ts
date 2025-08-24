import { DataProvider } from './DataProvider';
import { Asset, AssetAssignment, AuditLog, Notification, Policy, User } from './types';

/**
 * PostgreSQL based provider using pg library.
 * Placeholder implementation.
 */
export class PostgresProvider implements DataProvider {
  constructor(private connectionString: string) {}
  async listUsers(): Promise<User[]> { throw new Error('Not implemented'); }
  async getUser(id: string): Promise<User | undefined> { throw new Error('Not implemented'); }
  async createUser(user: User): Promise<void> { throw new Error('Not implemented'); }
  async updateUser(user: User): Promise<void> { throw new Error('Not implemented'); }
  async listAssets(): Promise<Asset[]> { throw new Error('Not implemented'); }
  async getAsset(id: string): Promise<Asset | undefined> { throw new Error('Not implemented'); }
  async createAsset(asset: Asset): Promise<void> { throw new Error('Not implemented'); }
  async updateAsset(asset: Asset): Promise<void> { throw new Error('Not implemented'); }
  async listAssignmentsForAsset(assetId: string): Promise<AssetAssignment[]> { throw new Error('Not implemented'); }
  async createAssignment(assign: AssetAssignment): Promise<void> { throw new Error('Not implemented'); }
  async closeAssignment(id: string, unassigned_at: string, unassigned_by: string, remarks?: string): Promise<void> { throw new Error('Not implemented'); }
  async addAudit(log: AuditLog): Promise<void> { throw new Error('Not implemented'); }
  async listAuditLogs(): Promise<AuditLog[]> { throw new Error('Not implemented'); }
  async listPolicies(): Promise<Policy[]> { throw new Error('Not implemented'); }
  async savePolicy(policy: Policy): Promise<void> { throw new Error('Not implemented'); }
  async addNotification(notification: Notification): Promise<void> { throw new Error('Not implemented'); }
  async listNotifications(): Promise<Notification[]> { throw new Error('Not implemented'); }
}
