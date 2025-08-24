import { DataProvider } from './DataProvider';
import { InMemoryProvider } from './InMemoryProvider';
import { SheetsProvider } from './SheetsProvider';
import { PostgresProvider } from './PostgresProvider';
import { AzureProvider } from './AzureProvider';

// Placeholder for real providers (SheetsProvider, PostgresProvider, AzureProvider)
export function getProvider(): DataProvider {
  const backend = process.env.DATA_BACKEND || 'memory';
  switch (backend) {
    case 'sheet':
      return new SheetsProvider(process.env.SHEET_ID || '');
    case 'postgres':
      return new PostgresProvider(process.env.DATABASE_URL || '');
    case 'azure':
      return new AzureProvider(process.env.AZURE_CONN || '');
    default:
      return new InMemoryProvider();
  }
}
