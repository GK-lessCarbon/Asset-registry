import { InMemoryProvider } from '../src/data/InMemoryProvider';
import { createAsset, assignAsset } from '../src/services/assetService';
import { Asset } from '../src/data/types';

describe('Audit logging', () => {
  it('records audit entries for asset creation and assignment', async () => {
    const provider = new InMemoryProvider();
    const asset = await createAsset({
      device_type: 'laptop', device_model: 'MBP', serial_no: 'S1', ownership: 'company_owned', device_status: 'active', mdm_protection: 'none'
    }, provider);
    await assignAsset(asset.id, 'u1', 'admin', '2024-01-01', undefined, provider);
    expect(provider.audits.length).toBe(2);
    expect(provider.audits[0].action).toBe('create');
    expect(provider.audits[1].action).toBe('assign');
  });
});
