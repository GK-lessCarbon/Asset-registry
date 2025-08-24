import { InMemoryProvider } from '../src/data/InMemoryProvider';
import { handleUserExit, assignAsset } from '../src/services/assetService';
import { Asset, User } from '../src/data/types';

describe('BYOD archive rule', () => {
  it('archives BYOD assets on user exit', async () => {
    const provider = new InMemoryProvider();
    const user: User = { id: 'u1', employee_code: 'E1', name: 'User', email: 'u@example.com', department: 'IT', designation: 'Dev', join_date: '2023-01-01', status: 'active', is_byod_user: true, created_at: '', updated_at: '' };
    provider.users.push(user);
    const byod: Asset = { id: 'a1', asset_tag: 'AST-000001', device_type: 'laptop', device_model: 'MBP', serial_no: 'S1', ownership: 'byod', device_status: 'active', mdm_protection: 'none', created_at: '', updated_at: '' };
    const company: Asset = { id: 'a2', asset_tag: 'AST-000002', device_type: 'laptop', device_model: 'MBP', serial_no: 'S2', ownership: 'company_owned', device_status: 'active', mdm_protection: 'none', created_at: '', updated_at: '' };
    provider.assets.push(byod, company);
    await assignAsset('a1', 'u1', 'admin', '2024-01-01', undefined, provider);
    await assignAsset('a2', 'u1', 'admin', '2024-01-01', undefined, provider);
    await handleUserExit('u1', '2024-06-01', 'admin', provider);
    expect(provider.assets.find(a => a.id === 'a1')?.device_status).toBe('archived');
    expect(provider.assets.find(a => a.id === 'a2')?.device_status).toBe('unassigned');
  });
});
