import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProcessingPhaseService } from './processing-phase.service';
import { ProcessingPhaseResponse } from './dtos/processing-phase.response';

@Resolver()
export class ProcessingPhaseResolver {
  constructor(
    private readonly processingPhaseService: ProcessingPhaseService,
  ) {}

  @Query(() => [ProcessingPhaseResponse])
  async processingPhases(
    @Args('variant', { type: () => String, defaultValue: 'latest' })
    variant: 'latest' | 'running',
  ): Promise<ProcessingPhaseResponse[]> {
    return this.processingPhaseService.findAll(variant);
  }
}
