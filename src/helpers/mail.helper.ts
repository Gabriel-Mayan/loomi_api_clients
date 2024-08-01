import { isAfterDate } from "../utils/date.util";
import { RecoveryPasswordRepository } from "../repositories/recovery-password.repository";
import { InternalError, RequestFieldError } from "../services/error.service";
import { serviceMailSender } from "../services/messagery.service";

export const recoveryPasswordMailSend = async ({ to, code }: { to: string, code: any }) => {
    await serviceMailSender({ topic: 'recovery-password', message: { to, code }});
};

export const recoveryPasswordMailSent = async ({ to, code, isSent }: { to: string, code: any, isSent: boolean }) => {
    const recovery = await RecoveryPasswordRepository.findRecovery({ id: code });

    if (!recovery) {
        throw new RequestFieldError("Request does not exist...");
    };

    const expiredTime = isAfterDate(new Date(), recovery.expiresIn);

    if (expiredTime) {
        throw new RequestFieldError("Request timeout expired...");
    };

    const recoveryUpdated = await RecoveryPasswordRepository.updateRecovery({ id: recovery.id, isSent });

    if (!recoveryUpdated.affected) {
        throw new InternalError("Error when updating password...", { extras: { recovery_info: { to, code } } });
    };
    
    return true;
};
