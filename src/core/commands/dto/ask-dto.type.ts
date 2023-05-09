import { Param } from '@discord-nestjs/core'

export class AskDto {
  @Param({
    description: 'What you feel like saying',
    required: true,
  })
  text: string
}
