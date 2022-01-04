export class CamionModel{
    id: number = 0;
    marque: string = '';
    model: string = '';
    matricule: string = '';
    couleur: string ='';
    anneFabrication: string='';
    poids: number = 0.0;
    puissance: number = 0.0;
    dateEntretien: string = '';
    disponible: boolean = true;
    pret: boolean = true;
    chauffeur: number = 0;
    assetId: string ='';
    description:string =''; 
    manufacture: string ='';
    serialNumber: string ='';
    isUsDot: boolean = true;
}