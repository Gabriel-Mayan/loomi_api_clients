import { cpfValidation } from "../utils/regex.util";

export function validateCpf({ cpf }: Readonly<{ cpf: string }>) {
    const isFormatted = cpfValidation.test(cpf);

    if(!isFormatted) {
        return false;
    }

    const formattedCpf = cpf.replace(/[^0-9]/g, '');

    if (
        formattedCpf.length != 11 ||
        formattedCpf == '00000000000' ||
        formattedCpf == '11111111111' ||
        formattedCpf == '22222222222' ||
        formattedCpf == '33333333333' ||
        formattedCpf == '44444444444' ||
        formattedCpf == '55555555555' ||
        formattedCpf == '66666666666' ||
        formattedCpf == '77777777777' ||
        formattedCpf == '88888888888' ||
        formattedCpf == '99999999999'
    )
        return false;

    let add = 0;

    for (let i = 0; i < 9; i++) add += parseInt(formattedCpf.charAt(i)) * (10 - i);

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(formattedCpf.charAt(9))) return false;

    add = 0;

    for (let i = 0; i < 10; i++) add += parseInt(formattedCpf.charAt(i)) * (11 - i);

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(formattedCpf.charAt(10))) return false;

    return true;
}
