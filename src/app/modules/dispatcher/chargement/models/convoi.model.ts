export class ConvoiModel{
    id: number = 0;
    adresseDepart: number = 0;
    adresseDestination: number = 0;
    chauffeur: number = 0;
    camion: number = 0;
    citerne: number = 0;
    commande: number = 0;
    dateDepart: string = '';
    dateHeureDebutDechargementEffective: Date = new Date();
    dateHeureFinDechargementEffective: Date = new Date();
}
