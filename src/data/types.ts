export type UserStatus = 'active' | 'inactive';
export type DeviceType = 'laptop' | 'monitor' | 'workstation' | 'keyboard' | 'mouse' | 'other';
export type Ownership = 'company_owned' | 'byod';
export type DeviceStatus = 'active' | 'unassigned' | 'retired' | 'archived';
export type MdmProtection = 'none' | string;

export interface User {
  id: string;
  employee_code: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  join_date: string;
  exit_date?: string | null;
  status: UserStatus;
  is_byod_user: boolean;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  asset_tag: string;
  device_type: DeviceType;
  device_model: string;
  serial_no: string;
  ownership: Ownership;
  device_status: DeviceStatus;
  mdm_protection: MdmProtection;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AssetAssignment {
  id: string;
  asset_id: string;
  user_id?: string | null;
  assigned_at: string;
  unassigned_at?: string | null;
  assigned_by: string;
  unassigned_by?: string | null;
  remarks?: string;
}

export type AuditAction = 'create' | 'update' | 'delete' | 'assign' | 'unassign' | 'status_change' | 'import' | 'export' | 'policy_update' | 'role_change';
export type EntityType = 'asset' | 'user' | 'policy' | 'setting';

export interface AuditLog {
  id: string;
  actor_user_id: string;
  action: AuditAction;
  entity_type: EntityType;
  entity_id: string;
  before_json: any;
  after_json: any;
  occurred_at: string;
}

export interface Policy {
  id: string;
  key: string;
  value_json: any;
  updated_by: string;
  updated_at: string;
}

export type NotificationType = 'email' | 'slack' | 'banner';
export type NotificationStatus = 'queued' | 'sent' | 'failed';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  related_entity_type?: EntityType;
  related_entity_id?: string;
  created_at: string;
  status: NotificationStatus;
}
