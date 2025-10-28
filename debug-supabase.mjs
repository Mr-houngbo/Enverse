// Script pour appliquer la migration Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Charger les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Lire le fichier de migration
const migrationPath = path.join(process.cwd(), 'supabase_migration.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

async function runMigration() {
  try {
    console.log('Application de la migration...');
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });

    if (error) {
      console.error('Erreur lors de la migration:', error);
      return;
    }

    console.log('Migration appliquée avec succès !');
  } catch (error) {
    console.error('Erreur:', error);
  }
}

runMigration();
