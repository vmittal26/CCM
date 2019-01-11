const headers : any = {
    ID_SEGNALAZIONE_ENTITA: {
        Header: "ID SEGNALAZIONE ENTITA",
        accessor: "idSegnalazioneEntita",
        minWidth: 200
    },
    CODICE_RICHIESTA_SPP: {
        Header: "CODICE RICHIESTA SPP",
        accessor: "codiceRichiestaSpp",
        minWidth: 200,
    },
    DATA_APERTURA_SEGNALAZIONE: {
        Header: "DATA APERTURA SEGNALAZIONE",
        accessor: "dataAperturaSegnalazione",
        minWidth: 200
    },
    DATA_CHIUSURA_SEGNALAZIONE: {
        Header: "DATA CHIUSURA SEGNALAZIONE",
        accessor: "dataChiusuraSegnalazione",
        minWidth: 200
    },
    ID_SEGNALAZIONE: {
        Header: "ID SEGNALAZIONE",
        accessor: "idSegnalazione",
        minWidth: 150
    },
    MOTIVAZIONE_APERTURA_OPI: {
        Header: "MOTIVAZIONE APERTURA OPI",
        accessor: "motivazioneAperturaOpi",
        minWidth: 200
    },
    NUM_SEGNALAZIONE: {
        Header: "NUMSEGNALAZIONE",
        accessor: "numSegnalazione",
        className: 'cell',
        minWidth: 150
    },
    NUM_SOLLECITI: {
        Header: "NUM SOLLECITI",
        accessor: "numSolleciti",
        className: 'cell',
        minWidth: 100
    },
    RISPOSTA_TIM: {
        Header: "RISPOSTA TIM",
        accessor: "rispostaTim",
        minWidth: 200
    },
    TIPO_ENTITA: {
        Header: "TIPO ENTITA",
        accessor: "tipiEntita.descrizione",
        minWidth: 200
    },
    TIPO_OPI: {
        Header: "TIPO OPI",
        accessor: "tipiOpi.descrizione",
        minWidth: 200
    },
    STATO_TIM: {
        Header: "STATO TIM",
        accessor: "statoTim.descrizione",
        minWidth: 200
    }
}

export default headers;
