import { Param } from '@discord-nestjs/core'

export class TextToImageDto {
  @Param({
    description: 'The image prompt',
    required: true,
  })
  text: string
}
