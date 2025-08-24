import { Asset, AssetAssignment, AuditLog, Policy, User, Notification } from './types';

export interface DataProvider {
  // Users
  listUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;

  // Assets
  listAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  createAsset(asset: Asset): Promise<void>;
  updateAsset(asset: Asset): Promise<void>;

  // Assignments
  listAssignmentsForAsset(assetId: string): Promise<AssetAssignment[]>;
  createAssignment(assign: AssetAssignment): Promise<void>;
  closeAssignment(id: string, unassigned_at: string, unassigned_by: string, remarks?: string): Promise<void>;

  // Audit Logs
  addAudit(log: AuditLog): Promise<void>;
  listAuditLogs(): Promise<AuditLog[]>;

  // Policies
  listPolicies(): Promise<Policy[]>;
  savePolicy(policy: Policy): Promise<void>;

  // Notifications
  addNotification(notification: Notification): Promise<void>;
  listNotifications(): Promise<Notification[]>;
}
