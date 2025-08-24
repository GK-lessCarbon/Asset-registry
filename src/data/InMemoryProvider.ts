import { DataProvider } from './DataProvider';
import { Asset, AssetAssignment, AuditLog, Notification, Policy, User } from './types';
import { randomUUID } from 'crypto';

export class InMemoryProvider implements DataProvider {
  users: User[] = [];
  assets: Asset[] = [];
  assignments: AssetAssignment[] = [];
  audits: AuditLog[] = [];
  policies: Policy[] = [];
  notifications: Notification[] = [];

  async listUsers() { return this.users; }
  async getUser(id: string) { return this.users.find(u => u.id === id); }
  async createUser(user: User) { this.users.push(user); }
  async updateUser(user: User) {
    const idx = this.users.findIndex(u => u.id === user.id);
    if (idx >= 0) this.users[idx] = user;
  }

  async listAssets() { return this.assets; }
  async getAsset(id: string) { return this.assets.find(a => a.id === id); }
  async createAsset(asset: Asset) { this.assets.push(asset); }
  async updateAsset(asset: Asset) {
    const idx = this.assets.findIndex(a => a.id === asset.id);
    if (idx >= 0) this.assets[idx] = asset;
  }

  async listAssignmentsForAsset(assetId: string) {
    return this.assignments.filter(a => a.asset_id === assetId).sort((a,b)=>a.assigned_at.localeCompare(b.assigned_at));
  }
  async createAssignment(assign: AssetAssignment) { this.assignments.push(assign); }
  async closeAssignment(id: string, unassigned_at: string, unassigned_by: string, remarks?: string) {
    const a = this.assignments.find(x => x.id === id);
    if (a) {
      a.unassigned_at = unassigned_at;
      a.unassigned_by = unassigned_by;
      a.remarks = remarks;
    }
  }

  async addAudit(log: AuditLog) { this.audits.push(log); }
  async listAuditLogs() { return this.audits; }

  async listPolicies() { return this.policies; }
  async savePolicy(policy: Policy) {
    const idx = this.policies.findIndex(p => p.id === policy.id);
    if (idx >= 0) this.policies[idx] = policy; else this.policies.push(policy);
  }

  async addNotification(notification: Notification) { this.notifications.push(notification); }
  async listNotifications() { return this.notifications; }
}
