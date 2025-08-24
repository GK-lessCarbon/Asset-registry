import { getProvider } from '../data';
import { Asset, AssetAssignment } from '../data/types';
import { randomUUID } from 'crypto';

const defaultProvider = getProvider();

export function generateAssetTag(prefix: string, counter: number): string {
  return `${prefix}-${counter.toString().padStart(6, '0')}`;
}

export async function createAsset(input: Omit<Asset, 'id' | 'asset_tag' | 'created_at' | 'updated_at'>, provider = defaultProvider): Promise<Asset> {
  const existing = (await provider.listAssets()).find(a => a.serial_no === input.serial_no);
  if (existing) throw new Error('Serial number already exists');
  const asset: Asset = {
    ...input,
    id: randomUUID(),
    asset_tag: generateAssetTag('AST', Date.now()),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await provider.createAsset(asset);
  await provider.addAudit({
    id: randomUUID(),
    actor_user_id: 'system',
    action: 'create',
    entity_type: 'asset',
    entity_id: asset.id,
    before_json: null,
    after_json: asset,
    occurred_at: new Date().toISOString(),
  });
  return asset;
}

export async function assignAsset(assetId: string, userId: string, actor: string, date: string, remarks?: string, provider = defaultProvider): Promise<AssetAssignment> {
  const assignments = await provider.listAssignmentsForAsset(assetId);
  if (assignments.some(a => !a.unassigned_at)) {
    throw new Error('Asset already assigned');
  }
  const assignment: AssetAssignment = {
    id: randomUUID(),
    asset_id: assetId,
    user_id: userId,
    assigned_at: date,
    assigned_by: actor,
    remarks,
  };
  await provider.createAssignment(assignment);
  await provider.addAudit({
    id: randomUUID(),
    actor_user_id: actor,
    action: 'assign',
    entity_type: 'asset',
    entity_id: assetId,
    before_json: null,
    after_json: assignment,
    occurred_at: new Date().toISOString(),
  });
  return assignment;
}

export async function unassignAsset(assetId: string, actor: string, date: string, remarks?: string, provider = defaultProvider): Promise<void> {
  const assignments = await provider.listAssignmentsForAsset(assetId);
  const open = assignments.find(a => !a.unassigned_at);
  if (!open) throw new Error('Asset not assigned');
  await provider.closeAssignment(open.id, date, actor, remarks);
  await provider.addAudit({
    id: randomUUID(),
    actor_user_id: actor,
    action: 'unassign',
    entity_type: 'asset',
    entity_id: assetId,
    before_json: open,
    after_json: { ...open, unassigned_at: date },
    occurred_at: new Date().toISOString(),
  });
}

export async function handleUserExit(userId: string, exitDate: string, actor: string, provider = defaultProvider) {
  const assets = await provider.listAssets();
  for (const asset of assets) {
    const assignments = await provider.listAssignmentsForAsset(asset.id);
    const open = assignments.find(a => !a.unassigned_at && a.user_id === userId);
    if (open) {
      await provider.closeAssignment(open.id, exitDate, actor, 'User exit');
      if (asset.ownership === 'byod') {
        asset.device_status = 'archived';
      } else {
        asset.device_status = 'unassigned';
      }
      asset.updated_at = new Date().toISOString();
      await provider.updateAsset(asset);
    }
  }
}
