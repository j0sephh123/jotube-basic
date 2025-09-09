import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class StatisticsService {
  async getFreeSpace(): Promise<number> {
    return new Promise((resolve, reject) => {
      exec('df -h --output=avail /', (error, stdout) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error);
          return;
        }
        const freeSpaceString = stdout.split('\n')[1].trim();
        const freeSpaceNumber = parseFloat(
          freeSpaceString.replace(/[^\d.]/g, ''),
        );
        resolve(freeSpaceNumber);
      });
    });
  }
}
