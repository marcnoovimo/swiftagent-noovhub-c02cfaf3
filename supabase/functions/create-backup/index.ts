
// Supabase Edge Function pour la sauvegarde automatique
// Cette fonction sera appelée par un déclencheur de planification toutes les 48h

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gérer les requêtes CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Créer un client Supabase avec les clés d'API du service
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFolderName = `backup-${timestamp}`;

    // 1. Créer un dossier de sauvegarde daté
    await supabase.storage.from('archives')
      .upload(`${backupFolderName}/.backup-marker`, new Blob(['Backup started']));

    // 2. Obtenir tous les fichiers du bucket documents
    const { data: files, error: listError } = await supabase.storage
      .from('documents')
      .list('', { sortBy: { column: 'name', order: 'asc' } });

    if (listError) {
      throw new Error(`Erreur lors de la récupération des fichiers: ${listError.message}`);
    }

    // 3. Télécharger puis uploader chaque fichier dans le dossier de sauvegarde
    for (const file of files || []) {
      // Ignorer les dossiers
      if (file.id === null) continue;

      // Télécharger le fichier
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('documents')
        .download(`${file.name}`);

      if (downloadError) {
        console.error(`Erreur lors du téléchargement de ${file.name}: ${downloadError.message}`);
        continue;
      }

      // Uploader le fichier dans le dossier de sauvegarde
      await supabase.storage
        .from('archives')
        .upload(`${backupFolderName}/${file.name}`, fileData);
    }

    // 4. Sauvegarder les métadonnées de la base de données
    const { data: documents, error: dbError } = await supabase
      .from('documents')
      .select('*');

    if (dbError) {
      throw new Error(`Erreur lors de la récupération des métadonnées: ${dbError.message}`);
    }

    // 5. Enregistrer les métadonnées en tant que fichier JSON
    const metadataBlob = new Blob([JSON.stringify(documents, null, 2)], {
      type: 'application/json',
    });

    await supabase.storage
      .from('archives')
      .upload(`${backupFolderName}/metadata.json`, metadataBlob);

    // 6. Marquer la sauvegarde comme terminée
    await supabase.storage.from('archives')
      .upload(`${backupFolderName}/.backup-complete`, new Blob(['Backup completed']));

    // 7. Enregistrer dans la table des sauvegardes
    await supabase
      .from('backups')
      .insert({
        path: backupFolderName,
        created_at: new Date().toISOString(),
        status: 'complete'
      });

    return new Response(
      JSON.stringify({ success: true, message: "Sauvegarde complétée avec succès" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
