import { FindOptionsWhere, UpdateResult } from "typeorm";

import { RecoveryPassword } from "../entities/recovery-password.entity";

import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(RecoveryPassword);

export const RecoveryPasswordRepository = {
  findRecovery(query: FindOptionsWhere<RecoveryPassword>) {
    return repository.findOneBy({ ...query });
  },

  createRecovery(recovery: any) {
    return repository.insert(recovery);
  },

  updateRecovery({ id, isSent }: { id: string, isSent: boolean }): Promise<UpdateResult> {
    return repository.update({ id }, { mailSent: isSent });
  },
};