import { InMemoryProvider } from '../src/data/InMemoryProvider';
import { createAsset, assignAsset } from '../src/services/assetService';
import { randomUUID } from 'crypto';
import { User } from '../src/data/types';

async function run() {
  const provider = new InMemoryProvider();
  const users: User[] = [
    { id: 'u1', employee_code: 'E001', name: 'Alice', email: 'alice@example.com', department: 'IT', designation: 'Dev', join_date: '2023-01-01', status: 'active', is_byod_user: false, created_at: '', updated_at: '' },
    { id: 'u2', employee_code: 'E002', name: 'Bob', email: 'bob@example.com', department: 'IT', designation: 'Dev', join_date: '2023-01-01', status: 'active', is_byod_user: true, created_at: '', updated_at: '' },
  ];
  for (const u of users) await provider.createUser(u);
  const asset1 = await createAsset({ device_type: 'laptop', device_model: 'MBP', serial_no: 'S1', ownership: 'company_owned', device_status: 'active', mdm_protection: 'none' }, provider);
  const asset2 = await createAsset({ device_type: 'laptop', device_model: 'Dell', serial_no: 'S2', ownership: 'byod', device_status: 'active', mdm_protection: 'none' }, provider);
  await assignAsset(asset1.id, 'u1', 'admin', '2024-01-01', undefined, provider);
  await assignAsset(asset2.id, 'u2', 'admin', '2024-01-01', undefined, provider);
  console.log('Seeded in-memory data');
}

run();
