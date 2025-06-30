import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '~/drizzle/migrations';

const expo = openDatabaseSync('app.db', { enableChangeListener: true });
export const db = drizzle(expo);
/**
 * Custom hook to run Drizzle migrations on app startup.
 * Usage: Call useDatabaseMigrations() in your root component (e.g., App.tsx)
 * Returns: { success, error }
 */
export const useDatabaseMigrations = () => useMigrations(db, migrations);
