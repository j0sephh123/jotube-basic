import { Resolver, Query } from '@nestjs/graphql';
import { ProcessingPhaseService } from './processing-phase.service';
import { ProcessingPhaseResponse } from './dtos/processing-phase.response';

@Resolver()
export class ProcessingPhaseResolver {
  constructor(
    private readonly processingPhaseService: ProcessingPhaseService,
  ) {}

  @Query(() => [ProcessingPhaseResponse])
  async processingPhases(): Promise<ProcessingPhaseResponse[]> {
    return this.processingPhaseService.findAll();
  }
}
