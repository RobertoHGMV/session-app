export interface BillOfExchange {
    id: number;
    nossoNumero: string;
    notaFiscal: number;
    numeroDaParcela: number;
    tipoDeDocumento: string;
    codigoDoParceiro: string;
    nomeDoParceiro: string;
    valorDoBoleto: number;
    dataDoVencimento: Date;
    valorDoDesconto: number;
    valorDeAbatimento: number;
    valorDeJuros: number;
    valorDeMulta: number;
    linhaDigitavel: string;
    statusId: number;
    situacaoId: number;
}
