/**
 * Main application service
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a hello message
   */
  getHello(): string {
    return 'Hello World!';
  }
}
