import { InMemoryProvider } from '../src/data/InMemoryProvider';
import { assignAsset } from '../src/services/assetService';
import { Asset } from '../src/data/types';

describe('Assignment rules', () => {
  it('prevents overlapping assignments', async () => {
    const provider = new InMemoryProvider();
    provider.assets.push({
      id: 'a1', asset_tag: 'AST-000001', device_type: 'laptop', device_model: 'MBP', serial_no: 'S1', ownership: 'company_owned', device_status: 'active', mdm_protection: 'none', created_at: '', updated_at: ''
    } as Asset);
    await assignAsset('a1', 'u1', 'admin', new Date().toISOString(), undefined, provider);
    await expect(assignAsset('a1', 'u2', 'admin', new Date().toISOString(), undefined, provider)).rejects.toThrow('Asset already assigned');
  });
});
