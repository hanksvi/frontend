export interface AgreementResponse {
    id: number; // ID del trade en el backend
    state: "PENDING" | "ACCEPTED" | "REJECTED"; // Estado del trade
    itemIniName: string; // Nombre del ítem ofrecido por el iniciador
    itemFinName: string; // Nombre del ítem ofrecido por el receptor
    iniUsername: string;
    finUsername: string;
    id_Ini: number; // Nombre del usuario iniciador
    id_Fin: number; // Nombre del usuario receptor
}