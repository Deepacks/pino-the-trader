import { Param } from '@discord-nestjs/core';

export class TextToImageDto {
  @Param({
    description: 'The description of the image',
    required: true,
  })
  text: string;
}
