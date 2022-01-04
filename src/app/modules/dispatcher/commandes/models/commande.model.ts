import { Time } from '@angular/common';
import { Client } from '../../client/models/client-model';
import { ProduitModel } from '../../produit/models/produit.model';

export class CommandeModel{
    id: number = 0;
    reference: number = 0;
    clientExpediteur: Client = new Client;
    clientDestinataire: Client = new Client;
    qte_normal_expedie: number = 0;
    qte_degel_expedie: number = 0;
    temp_chargement_prevu: string ="AUCUN";//Time = { hours: 0, minutes: 0 };
    distance_expediteur_destinataire: number = 0;
    prix_chauffeur: number = 0;
    prix_voiturier: number = 0;
    date_chargement_prevu: Date = new Date();
    date_dechargement_prevu: Date = new Date();
    //heure_chargement_prevu: Time = { hours: 0, minutes: 0 };
    //heure_dechargement_prevu: Time = { hours: 0, minutes: 0 };
    produit: ProduitModel = new ProduitModel;
    id_Type_silo_chargement: string="AUCUN";
    id_Type_silo_dechargement: string="AUCUN";
}

export interface Type_Silo{
    id: number;
    libelle_type_silo: string;
}
